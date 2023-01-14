let url = "http://localhost:8080/api/staff/listmanagedstaff/";
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
        }
        //tạo button
        const button = document.createElement('button') 
        button.appendChild(document.createTextNode('Đã Duyệt'))
        button.style.backgroundColor = "Cornsilk"
        button.onclick = function(){approval(jsonstaff.MANV,mahd,masothue)}
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
        alert("Không Có Nhân Viên Nào Nào")
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