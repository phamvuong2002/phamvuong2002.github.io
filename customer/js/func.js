const jsoncustomer = JSON.parse(sessionStorage.getItem("jsoncustomer"))

const toText= ['Mã Khách Hàng', 'Tên Khách Hàng', 'Số Điện Thoại', 'Số Đơn Hàng Chưa Giao'];

if(jsoncustomer === null){
    console.log("logout")
    location.href = "/customer/login/index.html"
}

// hàm đăng xuất
function logout_forcustomer(){
    sessionStorage.clear()
    location.reload()
}

function returnDriver(){
    const customerInfo = Object.values(jsoncustomer);
    const header = document.getElementById("header-detail");
    
    for(let i = 0; i < customerInfo.length; i++){
        var div = document.createElement("div");
        div.setAttribute("class", "header-row");
        div.innerHTML = `<p>${toText[i]}</p>`;
        const label = document.createElement("label");
        label.appendChild(document.createTextNode(customerInfo[i]));
        div.appendChild(label);
        header.appendChild(div);
    }
}

//Display info of Customer
returnDriver();
