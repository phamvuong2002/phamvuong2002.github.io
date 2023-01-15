const BASE_URL = sessionStorage.getItem('baseUrl');
let url = BASE_URL + "/api/partner/listfoodforrestaurant"
let url_delete = BASE_URL + "/api/partner/deletefoodforrestaurant"

///-------------------TEST public API-------------------
// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/menu/"
// const url_delete = "https://a4b7-1-52-147-128.ap.ngrok.io/api/deletemenuitem/"

const toTextMenuItem ={
    "MACUAHANG": "Cửa Hàng: ",
    "TENMON": "Tên Món: ",
    "MIEUTA": "Miêu Tả: ",
    "TINHTRANG": "Tình Trạng: ",
    "GIA":"Giá: ",
    "SLDABAN": "SL Đã Bán: ",
    "GHICHU":"Ghi Chu: "
}

//get masothue and macuahang from manage_restaurant page
const masothue = localStorage.getItem('masothue')
const macuahang = localStorage.getItem('macuahang')
localStorage.clear()

function toupdateMonAn(){
    location.href = "update_menu_items.html"
}
function tocreateMonAn(){
    location.href = "add_menu_items.html"
}

async function deleteDish(tenmon, macuahang, masothue){
    const jsonObject ={
        "tenmon": tenmon,
        "macuahang": macuahang,
        "masothue": masothue
    }
    const response = await fetch(url_delete, {
        method: 'DELETE',
        body: JSON.stringify(jsonObject),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    console.log(Object.keys(data[0]))

    if(Object.keys(data[0]) == 'ERROR'){
        alert("ERROR: " + data[0].ERROR)
    }
    else{
        returnMenu(data)
    }
}

function returnMenu(data){
    if(data.length === 0){
        alert("Restaurant has no foods")
        location.href = "manage_restaurants.html"
    }
    //if exists previous data --> remove previous card
    const oldcard = document.getElementsByClassName("card")
    console.log("card:", oldcard.length)
    for (var i = oldcard.length - 1; i >= 0; --i) {
        oldcard[i].remove();
      }
    // check menu items
    if(data.length === 0){
        alert("Not Exists Menu Item To Display")
        return  
    }
    // display
    const divcontainer = document.getElementsByClassName("container")

    for(let i = 0; i < data.length; i++){
        const divcard = document.createElement("div")
        divcard.setAttribute("class", "card")
        const keys = Object.keys(data[i])
        const menuItem = data[i]
        for(let j = 0; j < keys.length; j++){
            const colum = document.createElement('div')
            colum.setAttribute("class", "colum")
            const title = document.createElement('label')
            title.setAttribute("class", "title") 
            title.appendChild(document.createTextNode(toTextMenuItem[keys[j]]))
            const content = document.createElement('label')
            content.appendChild(document.createTextNode(menuItem[keys[j]]))
            
            colum.appendChild(title)
            colum.appendChild(content)
            divcard.appendChild(colum)

            // button
            if(j === keys.length - 1)
            {
                const button = document.createElement("button")
                button.type = "submit"
                button.name ="Submit"
                button.id = "dbutton"
                button.innerHTML = "Xoá Món"
                button.onclick = function() {deleteDish(data[i].TENMON, data[i].MACUAHANG,masothue)};
                divcard.appendChild(button)
            }
        }
        divcontainer[0].appendChild(divcard)
    }
}

//----------------main------------------------------------
if(masothue === null || macuahang == null){
    location.href = '/partner/manage_restaurants.html'
}
async function displayMenuOfRestaurant(){
    // get restaurant
    const jsonObject = {
        "masothue" : masothue,
        "macuahang": macuahang
    } 
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(jsonObject),
            headers: {
                "Content-Type": "application/json",
            },
        });

        //return results 
        const json = await response.json();
        if(json.length !== 0){
            let keys = Object.keys(json[0])
            if (keys[0] === "ERROR"){
                let data = JSON.stringify(json[0].ERROR)
                alert(keys[0] + ' : ' + data)
                //console.log(data)
            }
            else {
                returnMenu(json)
            }
        }
        else{
            alert("Restaurant has no foods")
            location.href = "manage_restaurants.html"
        }
        
        
    } catch (e) {
        innerHTML = e.message;
    }
}

displayMenuOfRestaurant()