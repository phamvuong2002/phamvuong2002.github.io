const BASE_URL = sessionStorage.getItem('baseUrl')
let url_updateNOPPHI = BASE_URL + "/api/driver/updatenopphi/";

//hiển thị tình trạng khi chưa nộp phí

function returnDriver(data) {
    const driverInfo = Object.values(data)
    const header = document.getElementsByClassName("header-row")
    for (let i = 0; i < 5; i++) {
        const label = document.createElement("label")
        label.appendChild(document.createTextNode(driverInfo[i]))
        header[i].appendChild(label)
    }
    const updateTINHTRANG = document.getElementsByClassName("list-row")
    const h4 = document.createElement("h4")
    h4.setAttribute('id', 'tinhtrang')
    h4.appendChild(document.createTextNode(driverInfo[4]))
    updateTINHTRANG[0].appendChild(h4)

    //tạo nút nộp
    // <button onclick="activeAccount()" type="submit" id = "nopBTN">Nộp</button>
    const button = document.createElement("button")
    button.setAttribute("id","nopBTN")
    button.innerHTML = "Nộp"
    button.onclick = function(){activeAccount(data.MATX)}
    updateTINHTRANG[1].appendChild(button)
}

async function activeAccount(matx){
    url_updateNOPPHI = url_updateNOPPHI + matx
    const response = await fetch(url_updateNOPPHI)
    const dataObject = await response.json()
    console.log(dataObject[0])
    let keys = Object.keys(dataObject[0])
    if (keys[0] === "ERROR") {
        let data = JSON.stringify(dataObject[0].ERROR)
        alert(keys[0] + ' : ' + data)
    }
    else {
        alert(JSON.stringify(dataObject[0].RESULT))
        sessionStorage.clear()
        location.reload()
    }
    // alert("Kích Hoạt cho TX: "+ json)
}
//-----------------------main--------------------------------------
const jsondriver = JSON.parse(sessionStorage.getItem("jsondriver"))
if (jsondriver === null) {
    location.href = '/login/'
}
returnDriver(jsondriver)

// const nopButton = document.querySelector("form");  //nút nộp

// nopButton.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const jsonObject = getData(e.target);

//     jsonObject["MATX"] = matx
//     console.log('here', jsonObject)
//     try {
//         const response = await fetch(url, {
//             method: "PUT",
//             body: JSON.stringify(jsonObject),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         //return results of inserted parner 
//         const json = await response.json();


//         var dataObject = json.recordsets;
//         //check error insert parner into db
//         let keys = Object.keys(dataObject[0])
//         if (keys[0] === "ERROR") {
//             let data = JSON.stringify(dataObject[0].ERROR)
//             alert(keys[0] + ' : ' + data)
//             // console.log(data)
//         }
//         else {
//             respondMenu(json)
//         }

//     } catch (e) {
//         nopButton.innerHTML = e.message;
//     }
// });