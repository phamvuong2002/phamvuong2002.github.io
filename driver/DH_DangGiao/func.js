const BASE_URL = "https://ab3d-14-227-8-111.ap.ngrok.io"
let url = BASE_URL + "/api/driver/selectdonhangdanggiao/"
let url_updateTTDAGIAO = BASE_URL + "/api/driver/updatetinhtrangdh"

var toTextRestaurant ={
    "MADONHANG": "Mã hóa đơn: ",
    "DIACHI": "Địa chỉ giao: ",
    "PHIVANCHUYEN": "Tiền ship: ",
    "TONGGIA": "Tổng tiền: "
}

function chitietDH(matx,madh){
    localStorage.setItem('matx',matx)
    localStorage.setItem('madh',madh)
    window.open('/driver/DH_ChiTiet/index.html')
}


async function updateTinhtrangDaGiao(matx,madh){
    const newjsonObject = {
        "madh": madh,
        "matx": matx
    }
    const response = await fetch(url_updateTTDAGIAO, {
    method: "POST",
    body: JSON.stringify(newjsonObject),
    headers: {
        "Content-Type": "application/json",
    },
    });
    const json = await response.json();
    console.log('Return :',json)
    //check error
    let keys = Object.keys(json[0])
    if (keys[0] === "ERROR"){
        let data = JSON.stringify(json[0].ERROR)
        alert(keys[0] + ' : ' + data)
    }
    else {
        alert(json[0].RESULT)
        location.reload()
    }
}

function returnMenu(data){

    const divcontainer = document.getElementById("list-row-container")
    
    for(let i = 0; i < data.length; i++){
        
        const divcard = document.createElement("div")
        divcard.setAttribute("id", "list-row")
       
        const keys = Object.keys(data[i])
        
        const menuItem = data[i]
        //menuItem[keys[0]] mã đơn hàng tương ứng
        const colum_6 = document.createElement('div')
        colum_6.setAttribute("id", "list-row-col-6")
        const colum_4 = document.createElement('div')
        colum_4.setAttribute("id", "list-row-col-4")
        //mã hóa đơn, địa chỉ giao
        for (let j = 0; j < 2; j++){
            const block = document.createElement('div')
            colum_6.appendChild(block)
            const title = document.createTextNode(toTextRestaurant[keys[j]])
            const content = document.createElement('label')
            content.setAttribute("id", "content")
            content.appendChild(document.createTextNode(menuItem[keys[j]]))
            block.appendChild(title)
            block.appendChild(content)
        }
        //tiền ship, tổng tiền
        for (let j = 2; j < 4; j++){
            const money_value = Math.round((parseFloat(menuItem[keys[j]]) + Number.EPSILON) * 100) / 100
            const block = document.createElement('div')
            colum_4.appendChild(block)
            const title = document.createTextNode(toTextRestaurant[keys[j]])
            const content = document.createElement('label')
            content.setAttribute("id", "content")
            content.appendChild(document.createTextNode(money_value))
            block.appendChild(title)
            block.appendChild(content)
        }
        
        
        divcard.appendChild(colum_6)
        divcard.appendChild(colum_4)
        //button
        const button = document.createElement("button")
        button.name ="update"
        button.id = "btn-select"
        button.innerHTML = "Đã Giao"
        button.onclick = function(){ updateTinhtrangDaGiao(jsondriver.MATX, data[i].MADONHANG)}
        divcard.appendChild(button)
    
    
        divcontainer.appendChild(divcard)

        //button
        const button2 = document.createElement("button")
        button2.name ="update"
        button2.id = "btn-select2"
        button2.innerHTML = "Chi Tiết"
        button2.onclick = function(){ chitietDH(jsondriver.MATX, data[i].MADONHANG)}
        divcard.appendChild(button2)
    
    
        divcontainer.appendChild(divcard)
    }
}

async function connectfetch(){
    url = url + jsondriver.MATX
    const response = await fetch(url);
    const data = await response.json();

    if(Object.keys(data[0]) == 'ERROR'){
        alert("ERROR: " + data[0].ERROR)
    }
    else{
        returnMenu(data)
    }
}

//--------------------main------------------------------------
const jsondriver = JSON.parse(sessionStorage.getItem("jsondriver"))
if(jsondriver === null){
    location.href = '/login/'
}
connectfetch()
