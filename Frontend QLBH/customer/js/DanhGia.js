const jsoncustomer = JSON.parse(sessionStorage.getItem("jsoncustomer"))
if(jsoncustomer === null){
    location.href = '/customer/login/index.html'
}

var disabled = JSON.parse(localStorage.getItem('disabled') || '[]');
var good = JSON.parse(localStorage.getItem('good') || '[]');
const id = good[0][0];
const dataTable = document.createElement('table');
const myOrder = {};
sessionStorage.setItem("CmtPageVisited", "True");

function confirm(){
  if(good.length > 0){
    // alert("click");
    var comment = document.getElementById('dropdown').value;
    console.log("comment:", comment);
    myOrder.MADONHANG=good[0][1];
    myOrder.MAKH=good[0][0];
    myOrder.DANHGIA=comment;

    console.log("myOrder:", myOrder);
    console.log("comment:", comment == null); 

    
    // var data = JSON.stringify(Object.assign({'MADONHANG', 'MAKH', 'DANHGIA'}, myOrder));
    // var obj = JSON.parse(data);
    // console.log("data", obj);
    // console.log("data", data.MADONHANG);

    const url = `http://localhost:8080/api/customer/addFeedback`;
    fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(myOrder)
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)));
    
    // disabled.push(good[0][5]);
    // localStorage.setItem('disabled', JSON.stringify(disabled));
    // console.log("button:", disabled);
    localStorage.removeItem('good');
    good = [];
  }
  else{
    alert("Không có đơn hàng để đánh giá");
  }
  $('.bill').empty();
}

function start(){
  var bill = document.getElementsByClassName('bill');
  $('.bill').empty();
  console.log(good);
  if(good.length > 0) {
    document.getElementById("KhachHang").innerHTML = id; // update later
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
    cell1.style.padding = "10px 0";
    cell1.innerText = "Mã hóa đơn";
    cell2.innerText = "Tổng tiền";
    cell3.innerText = "Trạng thái";
    cell4.innerText = "Ngày, giờ lập đơn";
    cell5.innerText = "Đánh giá";

    var Trow = dataTable.insertRow(1);
    var Tcell1 = Trow.insertCell(0);
    var Tcell2 = Trow.insertCell(1);
    var Tcell3 = Trow.insertCell(2);
    var Tcell4 = Trow.insertCell(3);
    var Tcell5 = Trow.insertCell(4);
    Tcell1.style.padding = "10px 0";
    Tcell1.innerText = good[0][1];
    Tcell2.innerText = good[0][2];
    Tcell3.innerText = good[0][3];
    Tcell4.innerText = good[0][4];
    const comment = document.createElement("input");
    comment.setAttribute("id", "comment");
    comment.setAttribute("type", "text");
    var feedback = document.createElement('select');
    feedback.setAttribute("id", "dropdown");
    var option1 = document.createElement('option');
    var option2 = document.createElement('option');
    var option3 = document.createElement('option');
    var option4 = document.createElement('option');
    var option5 = document.createElement('option');
    var option6 = document.createElement('option');
    // var option7 = document.createElement('option');
    option1.value = "0/5";
    option1.innerText = "Đánh giá";
    option2.value = "1/5";
    option2.innerText = "1/5";
    option3.value = "2/5";
    option3.innerText = "2/5";
    option4.value = "3/5";
    option4.innerText = "3/5";
    option5.value = "4/5";
    option5.innerText = "4/5";
    option6.value = "5/5";
    option6.innerText = "5/5";
    feedback.append(option1, option2, option3, option4, option5, option6);
    Tcell5.appendChild(feedback);

    detail.appendChild(dataTable);  
    bill[0].appendChild(detail);
  }
  else{
    document.getElementsByClassName("bill").innerText = "Đơn hàng đã được đánh giá";
  }
}
