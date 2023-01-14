const jsoncustomer = JSON.parse(sessionStorage.getItem("jsoncustomer"))
if(jsoncustomer === null){
    location.href = '/customer/login/index.html'
}

var order = JSON.parse(localStorage.getItem('order') || '[]');
const dataTable = document.createElement('table');
const id = jsoncustomer.MAKH; //update later
const myOrder = {};
const orderStore = {};
const orderDetail = [];

function getOption() {
  selectElement = document.querySelector('#payment');
  output = selectElement.options[selectElement.selectedIndex].value;
  document.querySelector('.output').textContent = output;
}

function getCol(matrix, col){
  var column = [];
  for(var i=0; i<matrix.length; i++){
     column.push(matrix[i][col]);
  }
  return column;
}

function sum(matrix){
  var sum = 0;
  for(var i=0; i<matrix.length; i++){
     sum += (matrix[i]);
  }
  return sum;
}

// -------------Generate ID--------------------
String.prototype.hashCodeForOrder = function() {
  var hash = 0,
  i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  const hashStr = hash.toString();
  if(hashStr[0] === '-'){
      return hashStr.replace("-","22");
  }
  return hashStr;
};

function start(){
  var bill = document.getElementsByClassName('bill');
  $('.bill').empty();
  document.getElementById("KhachHang").innerHTML = id; // update later
  console.log(order);

  if(order.length > 0){
      const detail = document.createElement('div');
      detail.setAttribute("id","detail");
      dataTable.style.textOverflow = "clip";
      var Theader = dataTable.createTHead();
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
      cell2.innerText = "Tên món";
      cell3.innerText = "Giá";
      cell4.innerText = "Số lượng";
      cell5.innerText = "Đơn giá";
      cell6.innerText = "Tùy chọn";

      for (let i = 0; i < order.length; i++){
          var Trow = dataTable.insertRow(i + 1);
          var Tcell1 = Trow.insertCell(0);
          var Tcell2 = Trow.insertCell(1);
          var Tcell3 = Trow.insertCell(2);
          var Tcell4 = Trow.insertCell(3);
          var Tcell5 = Trow.insertCell(4);
          var Tcell6 = Trow.insertCell(5);
          Tcell1.style.padding = "10px 0";
          Tcell1.innerText = i + 1;
          Tcell2.innerText = order[i][1];
          Tcell3.innerText = order[i][2];
          Tcell4.innerText = order[i][3];
          Tcell5.innerText = order[i][4];
          var edit = document.createElement('button');
          edit.setAttribute("class", "glyphicon glyphicon-trash");
          edit.style.color = "white";
          edit.setAttribute("id", "undo");
          edit.style.padding = "10px 20px";

          edit.onclick = () => {
            var remove = order.splice(i, 1);
            console.log(remove);
            console.log(order);
            localStorage.setItem('order', JSON.stringify(order));
            location.reload();
          };
          Tcell6.appendChild(edit);
      }

      const ship = Number(sum(getCol(order , 3)) * 5  ); 
      const all = Number(sum(getCol(order , 4)).toFixed(2));
      const total = all + ship;
      document.getElementById("ship").innerHTML = ship;
      document.getElementById("sum").innerHTML = total;

      detail.appendChild(dataTable);
      bill[0].appendChild(detail);
  }
}

function pay(){
  var payment = document.getElementById('payment').value;
  var ship = document.getElementById('ship').textContent;
  var sum = document.getElementById('sum').textContent;
  var address = document.getElementById('address').value;
  // console.log("payment:", payment);
  // console.log("ship:", ship);
  // console.log("sum:", sum);
  // console.log("address:", address);

  // var note =[];
  // for (let i = 0; i < order.length; i++){
  //   const ith =  document.getElementById(`note${i+1}`).value;
  //   note.push(ith);
  // }
  // console.log("note:", note);
  
  if(order.length > 0){
    if(payment == "null"){
      alert("Chưa chọn hình thức thanh toán");
    }
    else if(address.trim().length === 0){
      alert("Chưa nhập địa chỉ giao hàng");
    }
    else{
      console.log("order:", order);

      var strMaDH = "";
    
      for (let i = 0; i < order.length; i++){
        strMaDH += order[i][0] + order[i][1] + order[i][4];
        // console.log(strMaDH);
      }
    
      strMaDH += new Date().toISOString();
      var MADONHANG = "DH" + strMaDH.hashCodeForOrder();
      // MADONHANG = 'DH1630406651';
      console.log("MADONHANG", MADONHANG);
      myOrder.MADONHANG = MADONHANG;
      myOrder.MAKH = id;
      myOrder.PHIVANCHUYEN = ship;
      myOrder.TINHTRANG = "Chờ Vận Chuyển";
      myOrder.DIACHI = address;
      myOrder.HINHTHUCTHANHTOAN = payment;
      myOrder.TONGGIA = sum;
      myOrder.DANHGIA = "0/5";
      // myOrder.MACH = order[0][5]; // MACUAHANG
      
      var name = order[0][0];
      orderStore.MADONHANG = MADONHANG;
      orderStore.MACH = order[0][5];
      // for(let i = 0; i < order.length; i++){
      //   var name = order[i][0];
      //   var newOrderStore = {};
      //   // const keys = Object.keys(orderStore);
      //   // console.log(keys);
      //   if (orderStore == ""){
      //     newOrderStore.MADONHANG = MADONHANG;
      //     newOrderStore.TENQUAN = name;
      //     // newObj = Object.assign(newOrderStore);
      //     orderStore.push(newOrderStore);
      //   }   
      // }
    
      for(let i = 0; i < order.length; i++){
        var newOrderDetail = {};
        newOrderDetail.MADONHANG = MADONHANG;
        newOrderDetail.TENMON = order[i][1];
        newOrderDetail.DONGIA = order[i][4];
        newOrderDetail.SOLUONG = order[i][3];
        // console.log(newOrderDetail.isArray());
        orderDetail.push(newOrderDetail);
      }
      
      console.log("myOrder:", myOrder);
      // console.log("myOrderJS:", JSON.stringify(myOrder));
      console.log("orderStore:", orderStore);
      console.log("orderStoreJS:", JSON.stringify(orderStore));
      console.log("orderDetail:", orderDetail);
      console.log("orderDetailJS:", JSON.stringify(orderDetail));
      // console.log("length", orderDetail.length);
      
      const url1 = `http://localhost:8080/api/customer/addOrder`;
      const response = fetch(url1, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(myOrder)
      })
      .then(response => response.json())
      .then(response => {
        console.log(typeof JSON.stringify(response[0].ERROR) !== 'undefined');
        console.log(JSON.stringify(response[0].ERROR));
        console.log(JSON.stringify(response));  
        if((typeof JSON.stringify(response[0].ERROR) === 'undefined')){
          const url2 = `http://localhost:8080/api/customer/addOrderStore`;
          // for(let i = 0; i < orderStore.length; i++){
          fetch(url2, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderStore)
          })
          .then(OrdSt => OrdSt.json())
          .then(OrdSt => console.log(JSON.stringify(OrdSt)));
          // }

          const url3 = `http://localhost:8080/api/customer/addOrderDetail`;
          for(let i = 0; i < orderDetail.length; i++){
            fetch(url3, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetail[i])
            })
            .then(OrdDe => OrdDe.json())
            .then(OrdDe => console.log(JSON.stringify(OrdDe)));
          }
          location.href="TheoDoiDonHang.html";
        }
      });
    }
  }
  else{
    alert("Đơn hàng trống");
  }

  localStorage.removeItem('order');
  // alert("Emanan Direct");
}