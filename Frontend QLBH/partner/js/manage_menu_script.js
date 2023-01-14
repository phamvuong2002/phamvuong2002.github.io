const url = "http://localhost:8080/api/menu/"
const url_delete = "http://localhost:8080/api/deletemenuitem/"
///-------------------TEST public API-------------------
// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/menu/"
// const url_delete = "https://a4b7-1-52-147-128.ap.ngrok.io/api/deletemenuitem/"

const toTextMenuItem ={
    "TENMON": "Tên Món: ",
    "MIEUTA": "Miêu Tả: ",
    "GIA":"Giá: ",
    "TINHTRANG": "Tình Trạng: ",
    "SLDABAN": "SL Đã Bán: ",
    "GHICHU":"Ghi Chú: "
}

function toupdateMonAn(tenmon){
    localStorage.setItem('tenmon',tenmon)
    location.href = "update_menu_items.html"
}
function tocreateMonAn(){
    location.href = "add_menu_items.html"
}

async function deleteDish(masothue,tenmon){
    const url_delete_item = url_delete + tenmon
    const response = await fetch(url_delete_item, {
        method: 'DELETE',
    })
    const data = await response.json();
    console.log(Object.keys(data[0]))

    if(Object.keys(data[0]) == 'ERROR'){
        alert("ERROR: " + data[0].ERROR)
    }
    else{
        keys = Object.keys(data[0])
        alert("Deleted " + JSON.stringify(tenmon) + " Successfully")
        const url_searchItem = url + masothue
        const response = await fetch(url_searchItem);
        const newdata = await response.json();
        console.log(newdata)
        returnMenu(newdata,masothue)
    }

}

function returnMenu(data, searchItem){
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

            
            // delete button
            if(j === keys.length - 1)
            {
                const button = document.createElement("button")
                button.type = "submit"
                button.name ="Submit"
                button.id = "dbutton"
                button.innerHTML = "Xoá Món"
                button.onclick = function() {deleteDish(searchItem,data[i].TENMON)};
                divcard.appendChild(button)
            }
            // update button
            if(j === keys.length - 1)
            {
                const button = document.createElement("button")
                button.type = "submit"
                button.name ="Submit"
                button.id = "dbutton"
                button.innerHTML = "Cập Nhật"
                button.onclick = function() {toupdateMonAn(data[i].TENMON)};
                divcard.appendChild(button)
            }
        }
        divcontainer[0].appendChild(divcard)
    }
}

//-----------------------main-------------------------------------
if (sessionStorage.getItem("masothue") === null){
    location.href = '/login/index.html'
}

const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    searchItem = sessionStorage.getItem("masothue")
    if(searchItem === null){
        location.href = '/login/index.html'
    }
    else{
        console.log(url + searchItem)
        const url_searchItem = url + searchItem
        const response = await fetch(url_searchItem);
        const data = await response.json();
        console.log(data.length)

        if(data.length === 0){
            alert("Can't find the menu items of partner " + searchItem)
        }
        else{
            if(Object.keys(data[0]) == 'ERROR'){
                alert("ERROR: " + data[0].ERROR)
            }
            else{
                returnMenu(data,searchItem)
            }
        }
        
        
    }
})