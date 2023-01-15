const BASE_URL = sessionStorage.getItem('baseUrl');
let url = BASE_URL + "/api/menu/"
let url_addfood = BASE_URL + "/api/partner/addfoodforrestaurant"

///-------------------TEST public API-------------------
// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/menu/"
// const url_delete = "https://a4b7-1-52-147-128.ap.ngrok.io/api/deletemenuitem/"

//get macuahang, masothue form manage_menu page
const macuahang = localStorage.getItem('macuahang')
const masothue = localStorage.getItem('masothue')
localStorage.clear()

const toTextMenuItem ={
    "TENMON": "Tên Món: ",
    "MIEUTA": "Miêu Tả: ",
    "GIA":"Giá: ",
    "TINHTRANG": "Tình Trạng: ",
    "SLDABAN": "SL Đã Bán: ",
    "GHICHU":"Ghi Chú: "
}

async function addFoodforRestaurant(tenmon, macuahang, masothue) {
    const jsonObject ={
        "masothue": masothue,
        "macuahang": macuahang,
        "tenmon":tenmon
    }
    const response = await fetch(url_addfood, {
        method: "POST",
        body: JSON.stringify(jsonObject),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log("responsed data",data)
    if(Object.keys(data[0]) == 'ERROR'){
        alert("ERROR: " + data[0].ERROR)
    }
    else{
        alert("Add Food For Restaurant Successfully!")
    }
    // location.href = "manage_restaurants.html"
}

function returnMenu(data){
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

            // add food for restaurant button
            if(j === keys.length - 1)
            {
                const button = document.createElement("button")
                button.type = "submit"
                button.name ="Submit"
                button.id = "dbutton"
                button.innerHTML = "Thêm Món"
                button.onclick = function() {addFoodforRestaurant(data[i].TENMON,macuahang,masothue)};
                divcard.appendChild(button)
            }
        }
        divcontainer[0].appendChild(divcard)
    }
}

async function DisplayMenu(){
    let url_taxcode = url + masothue
    const response = await fetch(url_taxcode)
    const data = await response.json();
    console.log("list foods",data)

    if(data.length === 0){
        alert("Can't find the menu items of partner: " + masothue)
    }
    else{
        if(Object.keys(data[0]) == 'ERROR'){
            alert("ERROR: " + data[0].ERROR)
        }
        else{
            returnMenu(data)
        }
    }
}
//-----------------------------main---------------------------------
if(masothue === null || macuahang == null){
    location.href = '/partner/manage_restaurants.html'
}

const topnav = document.getElementsByClassName("topnav")
const h3 = document.createElement("h3")
h3.setAttribute("id", "title")
let content = "Thêm Món Ăn Của Đối Tác " + masothue + " Cho Cửa Hàng: " + macuahang 
h3.innerHTML = content
topnav[0].appendChild(h3)

DisplayMenu()