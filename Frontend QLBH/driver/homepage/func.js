const jsondriver = JSON.parse(sessionStorage.getItem("jsondriver"))
console.log("login json driver:", jsondriver)

if(jsondriver === null){
    location.href = "/login/"
}

// hàm đăng xuất
function logout(){
    sessionStorage.clear()
    location.reload()
  }
//kiểm tra tình trạng nộp phí
function checkStatus(url){
    if(jsondriver.TINHTRANGNOPPHI.toString()  === "Chưa Nộp  "){
        alert("Bạn Cần Nộp Phí Kích Hoạt Tài Khoản Để Vào Mục Này")
        location.reload()
    }else{
        location.href=url
    }
}
function checkStatus2(url){
    if(jsondriver.TINHTRANGNOPPHI.toString()  !== "Chưa Nộp  "){
        alert("Bạn Đã Kích Hoạt Tài Khoản Rồi!!!")
        location.reload()
    }else{
        location.href=url
    }
}

function returnDriver(data){
    const driverInfo = Object.values(data)
    const header = document.getElementsByClassName("header-row")
    for(let i = 0; i < driverInfo.length; i++){
        const label = document.createElement("label")
        label.appendChild(document.createTextNode(driverInfo[i]))
        header[i].appendChild(label)
    }
}

//Display info of Driver
returnDriver(jsondriver)
