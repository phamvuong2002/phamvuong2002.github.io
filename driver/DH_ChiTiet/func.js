const BASE_URL = "https://ab3d-14-227-8-111.ap.ngrok.io"
let url = BASE_URL + "/api/driver/selectctdh/"

const madh = localStorage.getItem('madh')
const matx = localStorage.getItem('matx')
localStorage.clear()
if(matx === null || madh === null){
    location.href ='/login/index.html'
}
else{
    url = url + madh
}

var header_text ={
    "MADONHANG": "Mã hóa đơn: ",
    "HOTEN": "Tên khách hàng: ",
    "SDT": "Số điện thoại KH: ",
    "NGAYLAP": "Ngày lập: "
}

var footer_text ={
    "DIACHI": "Địa chỉ: ",
    "PHIVANCHUYEN": "Tiền ship: ",
    "TONGGIA": "Tổng tiền: "
}


function returnMenu(data){
    
    const header_detail = document.getElementById("header-detail")

    //show header
    const keys_1 = Object.keys(data[0][0])
    var getData_1 = data[0][0]
    for (let j = 0; j < 4; j++){
        const header_info = document.createElement("div")
        header_info.setAttribute("id", "header-info")  
        const content = document.createElement('label')
        content.setAttribute("id", "content")
        
        
        content.appendChild(document.createTextNode(getData_1[keys_1[j]]))
        
        const title = document.createElement("p")
        title.appendChild(document.createTextNode(header_text[keys_1[j]]))
        header_info.appendChild(title)
        header_info.appendChild(content)
        
        header_detail.appendChild(header_info)
    }


    //show detail
    const list_row_container = document.getElementById("list-row-container")
    const keys_2 = Object.keys(data[1][0])
    
    var getData_2 = 0
    
    for (let j = 0; j < data[1].length; j++){
        getData_2 = data[1][j]
        const list_row = document.createElement("div")
        list_row.setAttribute("id", "list-row")
        const stt = document.createElement('label')
        stt.setAttribute("id", "stt")
        stt.appendChild(document.createTextNode(j+1))
        list_row.appendChild(stt)
        for (let k = 0; k < 3; k++){
            const content = document.createElement('label')
            content.setAttribute("id", "content")
            if (k==2){ 
                let money_value = Math.round((parseFloat(getData_2[keys_2[k]]) + Number.EPSILON) * 100) / 100
                content.appendChild(document.createTextNode(money_value))
            } else{
                content.appendChild(document.createTextNode(getData_2[keys_2[k]]))
            }
            list_row.appendChild(content)
        }  
       
        list_row_container.appendChild(list_row)
    }

    //show footer
    const footer_detail = document.getElementById("footer-detail")
    const keys_3 = Object.keys(data[2][0])
    var getData_3 = data[2][0]
   
    for (let j = 0; j < 3; j++){
        const footer_info = document.createElement("div")
        footer_info.setAttribute("class", "footer-info")
        const content = document.createElement('label')

        const title = document.createElement("p")
        title.appendChild(document.createTextNode(footer_text[keys_3[j]]))

        content.setAttribute("class", "footer-label")
        if (j == 0){
            content.appendChild(document.createTextNode(getData_3[keys_3[j]]))
        } else {
            let money_value = Math.round((parseFloat(getData_3[keys_3[j]]) + Number.EPSILON) * 100) / 100
            content.appendChild(document.createTextNode(money_value))
        }
        
        footer_info.appendChild(title)
        footer_info.appendChild(content)
        
        footer_detail.appendChild(footer_info)
    }
}

async function connectfetch(){
    
    
    const response = await fetch(url);
    const data = await response.json();
    
    if(Object.keys(data[0]) == 'ERROR'){
        alert("ERROR: " + data[0].ERROR)
    }
    else{
        returnMenu(data)
    }
}
connectfetch()


