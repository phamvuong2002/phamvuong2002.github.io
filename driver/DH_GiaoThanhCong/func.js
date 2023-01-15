const BASE_URL = sessionStorage.getItem('baseUrl')
let url = BASE_URL + "/api/driver/selectdonhangthanhcong/"


function returnMenu(data){
    
    const divcontainer = document.getElementById("list-row-container")
    
    for(let i = 0; i < data.length; i++){
        
        const divcard = document.createElement("div")
        divcard.setAttribute("id", "list-row")
       
        const keys = Object.keys(data[i])
       
        const menuItem = data[i]
        const stt = document.createElement('label')
        stt.setAttribute("id", "stt")
        stt.appendChild(document.createTextNode(i+1))
        divcard.appendChild(stt)
        const money_value = Math.round((parseFloat(menuItem[keys[2]]) + Number.EPSILON) * 100) / 100
        for (let j = 0; j < 3; j++){
            const content = document.createElement('label')
            content.setAttribute("id", "content")
            if (j==2){
                content.appendChild(document.createTextNode(money_value))
            } else {
                content.appendChild(document.createTextNode(menuItem[keys[j]]))
            }
            
            divcard.appendChild(content)
            
        }
        
        divcontainer.appendChild(divcard)
    }

    const footer = document.getElementById("footer-info")
    const tongdon = document.createElement('label')
    tongdon.appendChild(document.createTextNode(data.length))
    footer.appendChild(tongdon)
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
//--------------------main------------------------------------
const jsondriver = JSON.parse(sessionStorage.getItem("jsondriver"))
if(jsondriver === null){
    location.href = '/login/'
}
url = url + jsondriver.MATX

connectfetch()
