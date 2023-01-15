const BASE_URL = sessionStorage.getItem('baseUrl')
let url = BASE_URL + "/api/staff/statisticbill";

const jsonstaff = JSON.parse(sessionStorage.getItem("jsonstaff"))
if(jsonstaff === null){
    location.href = '/login/'
}

function createResponedDisplay(data){
    let listKH = []
    for(let i = 0; i< data.length; i++){
        listKH.push(data[i].MAKH)
    }
    const count = new Set(listKH)
    //EDIT LIST 
    const divcontainer = document.getElementById("list-row-container")
    var sum_money  = 0
    for(let i = 0; i < data.length; i++){
        
        const divcard = document.createElement("div")
        divcard.setAttribute("id", "list-row")
       
        const keys = Object.keys(data[i])
       
        const menuItem = data[i]
        const stt = document.createElement('label')
        stt.setAttribute("id", "stt")
        stt.appendChild(document.createTextNode(i+1))
        divcard.appendChild(stt)
        const money_value = Math.round((parseFloat(menuItem[keys[3]]) + Number.EPSILON) * 100) / 100
        sum_money += money_value
        for (let j = 0; j < 4; j++){
            const content = document.createElement('label')
            content.setAttribute("id", "content")
            if (j==3){
                content.appendChild(document.createTextNode(money_value))
            } else {
                content.appendChild(document.createTextNode(menuItem[keys[j]]))
            }
            
            divcard.appendChild(content)
            
        }
        
        divcontainer.appendChild(divcard)
    }
    //EDIT FOOTER
    const footer = document.getElementsByClassName("footer-info")
    
    const tongdon = document.createElement('label')
    tongdon.appendChild(document.createTextNode(data.length))
    footer[0].appendChild(tongdon)
    // 
    let money = sum_money.toString()
    const tongtien = document.createElement('label')
    tongtien.appendChild(document.createTextNode(money))
    footer[1].appendChild(tongtien)
    //
    let countkh = count.size.toString()
    const slkh = document.createElement('label')
    slkh.appendChild(document.createTextNode(countkh))
    footer[3].appendChild(slkh)

}


function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}

let TYPE = null
function setday(){
    TYPE = "DAY"
}
function setmonth(){
    TYPE = "MONTH"
}
function setyear(){
    TYPE = "YEAR"
}

const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    console.log("TYPE:",TYPE)
    const jsonObject = getData(e.target);
    jsonObject["LOAI"] = TYPE
    console.log(JSON.stringify(jsonObject))

    try {
        const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonObject),
        headers: {
            "Content-Type": "application/json",
        },
    });

        //return results of inserted parner 
        const json = await response.json();
        if(json.length === 0){
            alert("Không có đơn hàng nào")
            return
        }
        // console.log("tAO DA TOI DAY",json.recordset);
        var dataObject = json;
        //check error insert parner into db
        let keys = Object.keys(dataObject[0])
        
        if (keys[0] === "ERROR"){
            let data = JSON.stringify(dataObject[0].ERROR)
            alert(keys[0] + ' : ' + data)
        } else if(keys[0] === undefined ){
            alert(keys[0] + ': Không tồn tại hóa đơn theo thống kê')
        }
        else {
            createResponedDisplay(dataObject)
        }
        
    } catch (e) {
        formEl.innerHTML = e.message;
    }
        
});