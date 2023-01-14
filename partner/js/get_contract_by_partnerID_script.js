const BASE_URL = "https://ab3d-14-227-8-111.ap.ngrok.io"
let url = BASE_URL + "/api/partner/listcontracts/"


///-------------------TEST public API-------------------
// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/menu/"
// const url_delete = "https://a4b7-1-52-147-128.ap.ngrok.io/api/deletemenuitem/"


const toTextContacts = {
    "MAHOPDONG" : "Mã Hợp Đồng: ",
    "MASOTHUE" : "Mã Số Thuế: ",
    "MANV": "Nhân Viên QL: ",
    "NGAYLAP": "Ngày Lập: ",
    "PTHOAHONGTHANG": "% Hoa Hồng Theo Tháng: ",
    "PTHOAHONGDONHANG": "% Hoa Hồng Trên Mỗi Đơn Hàng: ",
    "SOCHINHANHDANGKY": "SLCN Đăng Ký:",
    "NGAYBATDAU": "Ngày BD: ",
    "NGAYKETTHUC": "Ngày KT: ",
}


function returnMenu(data, searchItem){
    
    //if exists previous data --> remove previous card
    const oldcard = document.getElementsByClassName("card")
    console.log("card:", oldcard.length)
    for (var i = oldcard.length - 1; i >= 0; --i) {
        oldcard[i].remove();
      }
    // check menu items
    if(data.length === 0){
        alert("Partner Has Not Contacts")
        return  
    }

    // display
    const divcontainer = document.getElementsByClassName("container")

    for(let i = 0; i < data.length; i++){
        const divcard = document.createElement("div")
        divcard.setAttribute("class", "card")
        const keys = Object.keys(data[i])
        const contract = data[i]
        if(contract.MANV === null){
            alert("Hợp Đồng Chưa Được Duyệt")
        }
        for(let j = 0; j < keys.length; j++){
            const colum = document.createElement('div')
            colum.setAttribute("class", "colum")
            const title = document.createElement('label')
            title.setAttribute("class", "title") 
            title.appendChild(document.createTextNode(toTextContacts[keys[j]]))
            const content = document.createElement('label')
            content.appendChild(document.createTextNode(contract[keys[j]]))
            
            colum.appendChild(title)
            colum.appendChild(content)
            divcard.appendChild(colum)
        }
        divcontainer[0].appendChild(divcard)
    }
}
async function DisplayContracts(){
    let searchItem = masothue
    if(searchItem === ""){
        alert("Can't Search With Null Value")

    }
    else{
        console.log(url + searchItem)
        const url_searchItem = url + searchItem
        const response = await fetch(url_searchItem);
        const data = await response.json();
        console.log(data[0])

        if(data.length === 0){
            alert("Not Found Contracts of Partner: " + searchItem)
        }
        else{
            if(Object.keys(data[0]) == 'ERROR'){
                alert("ERROR: " + data[0].ERROR)
            }
            else{
                returnMenu(data,searchItem)
            }
        }
        
    }
}
//-------------------------------main-----------------------
const masothue = sessionStorage.getItem("masothue")
if(masothue === null){
    location.href = '/login/'
}
DisplayContracts()