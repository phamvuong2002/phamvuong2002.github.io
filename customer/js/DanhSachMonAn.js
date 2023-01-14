const jsoncustomer = JSON.parse(sessionStorage.getItem("jsoncustomer"))
if(jsoncustomer === null){
    location.href = '/customer/login/index.html'
}
var id = null;
var order = JSON.parse(localStorage.getItem('order') || '[]');
var store = JSON.parse(localStorage.getItem('store') || '[]');

const toText= {
    "TENQUAN": "Tên cửa hàng",
    "TENMON": "Tên món",
    "MIEUTA": "Miêu tả",
    "GIA": "Giá"
};

function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
}

function start(){
    document.getElementById("SoLuong").innerHTML = order.length;
    var ifNeedCall = JSON.parse(localStorage.getItem('ifNeedCall') || '[]');
    if (ifNeedCall == true){
        // alert(store);
        getDisks();
        ifNeedCall = false;
        localStorage.setItem('ifNeedCall', JSON.stringify(ifNeedCall));
    }
}

function emptyStorage() {
    localStorage.removeItem('order');
    location.href="DanhSachCuaHang.html";
}

function getDisks(){
    var food = document.getElementsByClassName('food');
    $('.food').empty();

    id = document.getElementById('store').value;
    var url = `http://localhost:8080/api/customer/${id}`;
    console.log("url customer", url)

    if(store != ""){
        url = `http://localhost:8080/api/customer/${store}`;
        store = "";
        localStorage.setItem('store', JSON.stringify(store));
    }
    // alert(url);

    fetch(url)
    .then(response => response.json()) //convert to object
    .then(data => {
        console.log((typeof JSON.stringify(data[0].ERROR) !== 'undefined'));
        console.log(JSON.stringify(data[0]));
        // Adedentor WorldWide
        if((typeof JSON.stringify(data[0].ERROR) !== 'undefined') === false)
            handleData(data);
        else{
            data.map((values) => {    
                if(Object.keys(data[0]) == 'ERROR'){
                    alert("ERROR: " + data[0].ERROR)
                }  
                else{
                    location.reload()
                }  
                const key = Object.keys(values);
                const disk = document.createElement('div');
                disk.setAttribute("id","disk");
    
                const dataTable = document.createElement('table');
                dataTable.setAttribute("id", "dataTable");
                dataTable.style.textOverflow = "clip";
    
                for (let i = 0; i < 4; i++){
                    var row = dataTable.insertRow(i);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.style.width = '30%';
                    cell2.style.width = '70%';
                    cell1.innerText = toText[key[i]];
                    cell2.innerText = values[key[i]];
                }
                
                const select = document.createElement('button');
                select.innerText = "Chọn";
                select.setAttribute("id", "select");

                disk.appendChild(dataTable);
                disk.appendChild(select);
                food[0].appendChild(disk);
            });
        }
    });

    function handleData(data) {   
        data.map((values) => {    
            console.log(data);    
            const key = Object.keys(values);
            const disk = document.createElement('div');
            disk.setAttribute("id","disk");

            const dataTable = document.createElement('table');
            dataTable.setAttribute("id", "dataTable");
            dataTable.style.textOverflow = "clip";

            for (let i = 0; i < 4; i++){
                var row = dataTable.insertRow(i);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.style.width = '30%';
                cell2.style.width = '70%';
                cell1.innerText = toText[key[i]];
                cell2.innerText = values[key[i]];
            }
            
            const select = document.createElement('button');
            select.innerText = "Chọn";
            select.setAttribute("id", "select");
            select.onclick = () => {
                var store = dataTable.rows[0].cells[1].innerHTML;
                var name = dataTable.rows[1].cells[1].innerHTML;
                var price = dataTable.rows[3].cells[1].innerHTML;
                var storeID = values[key[4]];
                var gioBD = values[key[5]];
                var gioKT = values[key[6]];

                var column = getCol(order, 1);
                // console.log("a", column);
                var index = column.indexOf(name);
                // console.log("i", index);

                if (index != -1){
                    order[index][3] += 1;
                    order[index][4] = Math.round(((order[index][2] * order[index][3]) + Number.EPSILON) * 100) / 100;
                }
                else{
                    order.unshift([store, name, Math.round((parseFloat(price) + Number.EPSILON) * 100) / 100, 1, Math.round((parseFloat(price) + Number.EPSILON) * 100) / 100, storeID, gioBD, gioKT]);
                }

                document.getElementById("SoLuong").innerHTML = order.length;
                // console.log("LENGTH", order.length);
                console.log("ORDER", order);
                console.log("ORDER", order[0][0]);
                localStorage.setItem('order', JSON.stringify(order));
            };

            disk.appendChild(dataTable);
            disk.appendChild(select);
            food[0].appendChild(disk);
        });
    }
}

