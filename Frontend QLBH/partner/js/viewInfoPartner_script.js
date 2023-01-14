const url = "http://localhost:8080/api/parnersByID/"
const url_updatepassword = "http://localhost:8080/api/partner/updatepassword"

const masothue = sessionStorage.getItem("masothue")

///-------------------TEST public API-------------------
// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/menu/"
// const url_delete = "https://a4b7-1-52-147-128.ap.ngrok.io/api/deletemenuitem/"

const toTextPartner ={
    "MASOTHUE": "Mã Đối Tác: ",
    "MANV": "Nhân Viên Quản Lý: ",
    "NGUOIDAIDIEN": "Người Đại Diện: ",
    "EMAIL":"Email: ",
    "TENDOITAC": "Tên Đối Tác: ",
    "QUAN": "Quận: ",
    "SLCHINHANH": "SL Chi Nhánh: ",
    "SLDONHANGDUKIEN": "SL Đơn Hàng Dự Kiến: ",
    "LOAIAMTHUC": "Loại ẩm thực: ",
    "DIACHI": "Địa Chỉ: ",
    "SDT": "SĐT:",
    "MK": "Mật Khẩu: "
}
function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}
async function updatepassword() {
    const updateform = document.querySelector("form")
    updateform.addEventListener("submit", async (e) => {
        e.preventDefault();
        const jsonObject = getData(e.target);
        console.log("NEW PASSWORD:",jsonObject)
        const newpass = {
            "masothue": masothue,
            "newpass": jsonObject.newpw
        }
        if(jsonObject.newpw !== jsonObject.reinput){
            alert ("Nhập Lại Mật Khẩu Không Đúng")
            location.reload()
        }else{
            try {
                const response = await fetch(url_updatepassword, {
                method: "POST",
                body: JSON.stringify(newpass),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        
                //return results of inserted parner 
                const json = await response.json();
                
                console.log(json);
                let keys = Object.keys(json[0])
                console.log(keys)
                const data = json[0]
                alert(data[keys[0]])
                location.reload()
            } catch (e) {
                updateform.innerHTML = e.message;
            }
        }
        
    });
}
function changePw(){
// ---------- Display Change Password Form---------
    // ---------- remove if click change pw button again 
    const oldColum = document.getElementsByClassName("updatecolum")
    for(let i = oldColum.length - 1; i >= 0; i--){
        oldColum[i].remove()
    }
    // --------add label and input tag into form
    const form = document.getElementsByTagName("form")
    const colum = document.createElement("div")
    colum.setAttribute("class","updatecolum")
    const label = document.createElement("label")
    label.innerHTML = "Mật Khẩu Mới: "
    const label2 = document.createElement("label")
    label2.innerHTML = "Nhập Lại Mật Khẩu: "
    const inputpw = document.createElement("input")
    inputpw.type = "text"
    inputpw.name = "newpw"
    const reinput = document.createElement("input")
    reinput.type = "text"
    reinput.name = "reinput"
    colum.appendChild(label)
    colum.appendChild(inputpw)
    colum.appendChild(label2)
    colum.appendChild(reinput)
    form[0].appendChild(colum)
    //create button update
    const changePassword = document.createElement("button")
    changePassword.setAttribute("id", "newbutton")
    changePassword.innerText = "Cập Nhật"
    changePassword.type = "submit"
    changePassword.onclick = function() {  updatepassword()  }  
    colum.appendChild(changePassword)
    form[0].appendChild(colum)
// ---------------------update Password----------------

}

function returnInfoPartner(data){
    const divContainer = document.getElementsByClassName("container")

    let keys = Object.keys(data)
    let createButton = 1
    let loop = keys.length
    for(let i = 0; i< loop; i++){
        const divColum = document.createElement("div")
        divColum.setAttribute("class","colum")
        const label = document.createElement("label")
        let content = null
        if(i === 1){
            if(data[keys[1]] === null)
            {
                content = toTextPartner[keys[i]] + 'Chưa Có'
                createButton = 0
                loop = loop - 1
            }else{
                content = toTextPartner[keys[i]] + data[keys[i]]
            }
        }   
        else{
            content = toTextPartner[keys[i]] + data[keys[i]]
        }
        label.innerHTML = content
        
        divColum.appendChild(label)
        divContainer[0].appendChild(divColum)
    }
    //create button update password
    if(createButton === 1){
        const changePassword = document.createElement("button")
        changePassword.setAttribute("id", "dbutton")
        changePassword.innerText = "Thay Đổi Mật Khẩu"
        changePassword.onclick = function() {  changePw()  }  
        divContainer[0].appendChild(changePassword)
    }
}

async function DisplayRestaurants(){
    let searchItem = masothue
    const url_searchItem = url + searchItem
    const response = await fetch(url_searchItem);
    const data = await response.json();
    console.log(data.length)

    if(data.length === 0){
        alert("Can't find information of partner " + searchItem)
    }
    else{
        if(Object.keys(data[0]) == 'ERROR'){
            alert("ERROR: " + data[0].ERROR)
        }
        else{
            returnInfoPartner(data[0])
        }
    }
}

//--------------------------------main------------------------------
if (masothue === null){
    location.href = '/login/index.html'
}
DisplayRestaurants()