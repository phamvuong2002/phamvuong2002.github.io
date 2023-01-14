const BASE_URL = "https://ab3d-14-227-8-111.ap.ngrok.io"
let url = BASE_URL + "/api/restaurants/"
let url_update = BASE_URL + "/api/updaterestaurant"
const masothue = sessionStorage.getItem("masothue")

///-------------------TEST public API-------------------
// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/menu/"
// const url_delete = "https://a4b7-1-52-147-128.ap.ngrok.io/api/deletemenuitem/"

const toTextRestaurant ={
    "MACUAHANG": "Mã Cửa Hàng: ",
    "MASOTHUE": "Mã Số Thuế: ",
    "STK":"Stk: ",
    "NGANHANG": "Ngân Hàng: ",
    "TENQUAN": "Tên Cửa Hàng: ",
    "GIOMOCUA": "Giờ mở cửa: ",
    "GIODONGCUA": "Giờ đóng cửa: ",
    "DANHGIA": "Đánh Giá: ",
    "TINHTRANG": "Tình Trạng: ",
    "DIACHI": "Địa Chỉ: "
}

function toupdateRes(masothue, macuahang){
    localStorage.setItem('update_masothue', masothue)
    localStorage.setItem('update_macuahang', macuahang)
    location.href = "update_restaurant.html"
}
function tocreateRes(){
    location.href = "add_restaurant_for_partner.html"
}
function toaddfood(masothue, macuahang){
    localStorage.setItem('macuahang',macuahang)
    localStorage.setItem('masothue',masothue)
    location.href = "add_food_for_restaurant.html"
}
function toListFoodofRestaurant(masothue, macuahang){
    localStorage.setItem('macuahang',macuahang)
    localStorage.setItem('masothue',masothue)
    location.href = "menu_of_restaurant.html"
}
function returnRes(data, searchItem){
    //if exists previous display numof Restaurant
    const numRes = document.getElementById("cbutton")
    if(numRes !== null){
        numRes.remove()
    }
    // display numof Restaurant
    const topnav = document.getElementsByClassName("topnav")
    const countRes =  document.createElement("button")
    countRes.setAttribute("id","cbutton")
    countRes.innerText =  "Số Lượng CH: " + data.length
    topnav[0].appendChild(countRes)
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
        const restaurants = data[i]
        for(let j = 0; j < keys.length; j++){
            const colum = document.createElement('div')
            colum.setAttribute("class", "colum")
            const title = document.createElement('label')
            title.setAttribute("class", "title") 
            title.appendChild(document.createTextNode(toTextRestaurant[keys[j]]))
            const content = document.createElement('label')
            if(j === 5 || j === 6){
                let text = restaurants[keys[j]]
                let result1 = text.indexOf("T");
                let result2 = text.indexOf("Z");
                let substring = text.substring(result1 + 1, result2);
                content.appendChild(document.createTextNode(substring))
            }
            else{
                content.appendChild(document.createTextNode(restaurants[keys[j]]))
            }   
            
            
            colum.appendChild(title)
            colum.appendChild(content)
            divcard.appendChild(colum)

            // update button
            if(j === keys.length - 1)
            {
                const button = document.createElement("button")
                button.type = "submit"
                button.name ="Submit"
                button.id = "dbutton"
                button.innerHTML = "Cập Nhật"
                button.onclick = function() {toupdateRes(data[i].MASOTHUE, data[i].MACUAHANG)};
                divcard.appendChild(button)
            }
            //add food for restaurant button
            if(j === keys.length - 1)
            {
                const button = document.createElement("button")
                button.type = "submit"
                button.name ="Submit"
                button.id = "dbutton"
                button.innerHTML = "Thêm Món Ăn"
                button.onclick = function() {toaddfood(data[i].MASOTHUE, data[i].MACUAHANG)};
                divcard.appendChild(button)
            }
            //add food for restaurant button
            if(j === keys.length - 1)
            {
                const button = document.createElement("button")
                button.type = "submit"
                button.name ="Submit"
                button.id = "dbutton"
                button.innerHTML = "Danh Sách Món Ăn"
                button.onclick = function() {toListFoodofRestaurant(data[i].MASOTHUE, data[i].MACUAHANG)};
                divcard.appendChild(button)
            }
        }
        divcontainer[0].appendChild(divcard)
    }
}

async function DisplayRestaurants(){
    let searchItem = masothue
    const url_searchItem = url + searchItem
    const response = await fetch(url_searchItem);
    const data = await response.json();
    console.log(data.length)

    if(data.length === 0){
        alert("Can't find restaurants of partner " + searchItem)
    }
    else{
        if(Object.keys(data[0]) == 'ERROR'){
            alert("ERROR: " + data[0].ERROR)
        }
        else{
            returnRes(data,searchItem)
  
        }
    }
}

//--------------------------------main------------------------------
if (masothue === null){
    location.href = '/login/index.html'
}

const topnav = document.getElementsByClassName("topnav")
const h3 = document.createElement("h3")
h3.setAttribute("id", "title")
let content = "Xem Danh Sách Cửa Hàng Của Đối Tác " + masothue 
h3.innerHTML = content
topnav[0].appendChild(h3)

DisplayRestaurants()