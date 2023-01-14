const jsoncustomer = JSON.parse(sessionStorage.getItem("jsoncustomer"))
if(jsoncustomer === null){
    location.href = '/customer/login/index.html'
}

const dataTable = document.createElement('table');
var good = [];
localStorage.setItem('good', JSON.stringify(good));
var disabled = JSON.parse(localStorage.getItem('disabled') || '[]');

function start() {
  if (sessionStorage.getItem("CmtPageVisited")) {
    sessionStorage.removeItem("CmtPageVisited");
    window.location.reload(true); // force refresh page1
  }
  var order = document.getElementsByClassName('order');
  $('.order').empty();

  // id = document.getElementById('store').value;
  id = jsoncustomer.MAKH // update later
  document.getElementById("KhachHang").innerHTML = id; // update later
  const url = `http://localhost:8080/api/customer/order/${id}`;
  // alert(url);

  fetch(url)
  .then(response => response.json()) //convert to object
  .then(data => handleData(data));

  function handleData(data) {  
    // console.log(data[0].MADONHANG);
    // const key = Object.keys(values);
    // console.log(key);
    const status = document.createElement('div');
    status.setAttribute("id","status");
    dataTable.style.textOverflow = "clip";
    var Theader = dataTable.createTHead();
    // Theader.style.text = "skyblue";
    // Theader
    var row = Theader.insertRow(0);
    row.style.backgroundColor = "skyblue";
    row.style.fontWeight = "bold";
    row.style.fontSize = "18px";
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.style.padding = "10px 0";
    cell1.innerText = "STT";
    cell2.innerText = "Mã hóa đơn";
    cell3.innerText = "Tổng tiền";
    cell4.innerText = "Trạng thái";
    cell5.innerText = "Ngày, giờ lập đơn";
    cell6.innerText = "Đánh giá";
    
    for (let i = 0; i < data.length; i++){
      var Trow = dataTable.insertRow(i + 1);
      var Tcell1 = Trow.insertCell(0);
      var Tcell2 = Trow.insertCell(1);
      var Tcell3 = Trow.insertCell(2);
      var Tcell4 = Trow.insertCell(3);
      var Tcell5 = Trow.insertCell(4);
      var Tcell6 = Trow.insertCell(5);
      button = document.createElement('button');
      button.setAttribute("class", "glyphicon glyphicon-share-alt");
      button.style.color = "white";
      button.setAttribute("id", `button${i + 1}`);
      button.style.padding = "10px 20px";

      Tcell1.innerText = i + 1;
      Tcell2.innerText = data[i].MADONHANG;
      Tcell3.innerText = Math.round((data[i].TONGGIA + Number.EPSILON) * 100) / 100;
      Tcell4.innerText = data[i].TINHTRANG;
      Tcell5.innerText = data[i].NGAYLAP;
      Tcell6.appendChild(button);
      // console.log(Trow.cells[1]);
      // console.log(i+1 + ":", data[i].DANHGIA);
      // console.log(data[3].DANHGIA);
      if(data[i].DANHGIA.localeCompare('0/5') != 0){
        button.setAttribute("disabled", "true");
        button.innerText = "Đã đánh giá";
      }
      else{
        // button.setAttribute("disabled", "false");
        button.innerText = "Đánh giá";
        if(data[i].TINHTRANG.trim() == 'Đã Giao'){
          button.onclick = () => {
            var store = dataTable.rows[i+1].cells[1].innerHTML;
            var sum = dataTable.rows[i+1].cells[2].innerHTML;
            var state = dataTable.rows[i+1].cells[3].innerHTML;
            var date = dataTable.rows[i+1].cells[4].innerHTML;
            good.unshift([id, store, sum, state, date, `button${i+1}`]);
            localStorage.setItem('good', JSON.stringify(good));
            console.log(good);
            location.href="DanhGia.html";
          };
        }
        // console.log(i+1 , data[i].TINHTRANG.trim());
      }
    }
    status.appendChild(dataTable);
    order[0].appendChild(status);

    if(disabled.length > 0){
      console.log(disabled);
      for(i = 0; i < disabled.length; i++){
        document.getElementById(disabled[i]).disabled = true; //disable a button
      }    
    }
    // if(disabled.length == data.length)
      localStorage.removeItem('disabled');
  }
}