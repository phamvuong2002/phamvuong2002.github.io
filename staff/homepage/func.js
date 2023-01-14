const jsonstaff = JSON.parse(sessionStorage.getItem("jsonstaff"))

console.log(JSON.stringify(jsonstaff.VAITRO).substring(1,5)) 

if(jsonstaff === null){
    location.href = "/login/"
}

// hàm đăng xuất
function logout(){
    sessionStorage.clear()
    location.reload()
  }

function check(url){
    if(JSON.stringify(jsonstaff.VAITRO).substring(1,5)  !== "NVQL"){
        alert("Bạn Không Phải Là NVQL")
        return
    }
    location.href = url
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
returnDriver(jsonstaff)
