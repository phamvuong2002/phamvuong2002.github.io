const BASE_URL = sessionStorage.getItem('baseUrl');
let url = BASE_URL + "/api/staff/listapprovalstaff";
let url_update = BASE_URL + "/api/staff/duyetnhanvien"
const jsonstaff = JSON.parse(sessionStorage.getItem("jsonstaff"))

if(jsonstaff === null){
    location.href = '/login/'
}

async function approval(mvql,nv){
    const jsonObject ={
        "nvduyet": mvql,
        "nv": nv
    }
    const response = await fetch(url_update, {
        method: "POST",
        body: JSON.stringify(jsonObject),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data)
    console.log("responsed data",data)
    if(Object.keys(data[0]) == 'ERROR'){
        alert("ERROR: " + data[0].ERROR)
    }
    else{
        alert(data[0].RESULT)
        location.reload()
    }
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
        let manv = null
        for (let j = 0; j < 4; j++){
            const content = document.createElement('label')
            content.setAttribute("id", "content")
            content.appendChild(document.createTextNode(menuItem[keys[j]]))
            divcard.appendChild(content)
            manv = menuItem[keys[0]]
        }
        //tạo button
        const button = document.createElement('button') 
        button.appendChild(document.createTextNode('Chờ Duyệt'))
        button.style.backgroundColor = "Aqua"
        button.onclick = function(){approval(jsonstaff.MANV,manv)}
        divcard.appendChild(button)
        divcontainer.appendChild(divcard)
    }
    //EDIT FOOTER
}



async function DisplayContract(){
    const response = await fetch(url)

    //return results of inserted parner 
    const json = await response.json();
    console.log(json)
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