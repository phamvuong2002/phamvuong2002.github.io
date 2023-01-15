const BASE_URL = sessionStorage.getItem('baseUrl');
let url = BASE_URL + "/api/staff/listcontract/";
const jsonstaff = JSON.parse(sessionStorage.getItem("jsonstaff"))
if(jsonstaff === null){
    location.href = '/login/'
}


function createResponedDisplay(data){
    //EDIT LIST 
    const divcontainer = document.getElementById("list-row-container")
 
    for(let i = 0; i < data.length; i++){
        
        const divcard = document.createElement("div")
        divcard.setAttribute("id", "list-row")
       
        const keys = Object.keys(data[i])
       
        const menuItem = data[i]
        let check = ""
        let mahd = null, masothue = null
        for (let j = 0; j < 4; j++){
            const content = document.createElement('label')
            content.setAttribute("id", "content")
            content.appendChild(document.createTextNode(menuItem[keys[j]]))
            divcard.appendChild(content)
            if(j === 3){
                if(menuItem[keys[3]] === 1 ){
                    check = ""
                    check = check + "Gia Hạn"
                }
                if(menuItem[keys[3]] <= 0){
                    check = ""
                    check = check + "Hết Hạn"
                }
            }
        }
        //tạo button
        const button = document.createElement('button') 
        if(check === "Gia Hạn"){
            button.appendChild(document.createTextNode('Gửi Thông Báo Gia Hạn'))
            button.style.backgroundColor = "Crimson"
        }
        else if(check === "Hết Hạn"){
            button.appendChild(document.createTextNode('Đã Hết Hạn'))
            button.style.backgroundColor = "Azure"
        }
        else{
            button.appendChild(document.createTextNode('Đã Duyệt'))
            button.style.backgroundColor = "Cornsilk"
        }
        divcard.appendChild(button)
        
        divcontainer.appendChild(divcard)
    }
    //EDIT FOOTER
}



async function DisplayContract(){
    url = url + jsonstaff.MANV
    const response = await fetch(url)

    //return results of inserted parner 
    const json = await response.json();
    
    if(json.length === 0){
        alert("Không Có Hợp Đồng Nào")
        return
    }
    
    var dataObject = json
    //check error insert parner into db
    let keys = Object.keys(dataObject[0])
    console.log(keys)
    if (keys[0] === "ERROR"){
        let data = JSON.stringify(dataObject[0].ERROR)
        alert(keys[0] + ' : ' + data)
    }
    else {
        createResponedDisplay(dataObject)
    }
}

DisplayContract()