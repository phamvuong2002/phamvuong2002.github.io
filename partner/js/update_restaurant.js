const url = "http://localhost:8080/api/restaurantbyresid/" 
const url_update = "http://localhost:8080/api/updaterestaurant"

const masothue = localStorage.getItem('update_masothue')
const macuahang = localStorage.getItem('update_macuahang')
localStorage.clear();

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
const toTextRestaurantForUpdate ={
    "stk":"Stk: ",
    "nganhang": "Ngân Hàng: ",
    "giomocua": "Giờ mở cửa: ",
    "giodongcua": "Giờ đóng cửa: ",
    "tinhtrang": "Tình Trạng: "
}

function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}
function updateRes(){
    const updateform = document.getElementById("updateform")
    updateform.addEventListener("submit", async (e) => {
        e.preventDefault();
        const jsonObject = getData(e.target);
        jsonObject["macuahang"] = macuahang
        jsonObject["masothue"] = masothue
        if(jsonObject["giomocua"] === ""){
            jsonObject["giomocua"] = null
        }
        if(jsonObject["giodongcua"] === ""){
            jsonObject["giodongcua"] = null
        }
        //check update data is null
        if(jsonObject.giodongcua === null && jsonObject.giomocua === null && jsonObject.stk.length === 0
            && jsonObject.nganhang.length === 0 && jsonObject.tinhtrang.length === 0){
                alert("No New Information To Update")
                localStorage.setItem('update_masothue',masothue)
                localStorage.setItem('update_macuahang',macuahang)
                location.reload()
        }
        else{
            console.log("update Object:",jsonObject.stk.length)

        try {
            const response = await fetch(url_update, {
            method: "PUT",
            body: JSON.stringify(jsonObject),
            headers: {
                "Content-Type": "application/json",
            },
        });
    
            //return update results 
            const json = await response.json();
            
            console.log("result update:",json);
    
            //check error update
            let keys = Object.keys(json[0])
            if (keys[0] === "ERROR"){
                let data = JSON.stringify(json[0].ERROR)
                alert(keys[0] + ' : ' + data)
                localStorage.setItem('update_masothue',masothue)
                localStorage.setItem('update_macuahang',macuahang)
                location.reload()
            }
            else {
                alert("UPDATED SUCCESSFULLY: " + JSON.stringify(json))
                location.href = "manage_restaurants.html"
            }
            
        } catch (e) {
            updateform.innerHTML = e.message;
        }
        }
    });
}

async function displayUpdateRestaurant(){
    // get restaurant
    const url_macuahang = url + macuahang
    const response = await fetch(url_macuahang, {
        method: 'GET'
    })
    const data = await response.json();
    console.log(data)

    const form = document.getElementById("updateform")
    const container = document.createElement("div")
    container.setAttribute("class","container")

    //----------------------Display Info Restaurant ----------------------------
    const search_result_card = document.createElement("div")
    search_result_card.setAttribute("class", "search_result_card")

    const Res = data[0]
    const keys = Object.keys(Res)
    for(let i = 0; i < keys.length; i++)
    {
        const search_colum = document.createElement("div")
        search_colum.setAttribute("class","search_colum")
        const label = document.createElement("label")
        if(i === 5 || i === 6){
            let text = Res[keys[i]]
            let result1 = text.indexOf("T");
            let result2 = text.indexOf("Z");
            let substring = text.substring(result1 + 1, result2);
            label.innerText = toTextRestaurant[keys[i]] + substring
        }
        else{
            const content = toTextRestaurant[keys[i]] + Res[keys[i]]
            label.innerText = content
        }   
        

        search_colum.appendChild(label)
        search_result_card.appendChild(search_colum)
    }
    container.appendChild(search_result_card)
    //-------------------------Display update Form--------------------
    const update_card = document.createElement("div")
    update_card.setAttribute("class", "update_card")

    const h3 = document.createElement("h3")
    h3.appendChild(document.createTextNode("Những Thông Tin Được Phép Cập Nhật:"))
    update_card.appendChild(h3)

    const keys_forupdate = Object.keys(toTextRestaurantForUpdate)
    for(let i = 0; i< keys_forupdate.length; i++){
        const update_colum = document.createElement("div")
        update_colum.setAttribute("class", "update_colum")
        const label = document.createElement("label")
        label.appendChild(document.createTextNode(toTextRestaurantForUpdate[keys_forupdate[i]])) 
        const input = document.createElement("input")
        if(i === 2 || i === 3){ // giomocua, giodongcua
            input.type = "time"
        }
        else{
            input.type = "text"
        }
        input.placeholder = toTextRestaurantForUpdate[keys_forupdate[i]]
        input.name = keys_forupdate[i]

        update_colum.appendChild(label)
        update_colum.appendChild(input)
        update_card.appendChild(update_colum)

        if(i === keys_forupdate.length - 1)
        {   
            const update_colum = document.createElement("div")
            update_colum.setAttribute("class", "update_colum")
            const button = document.createElement("button")
            button.type = "submit"
            button.name = "Submit"
            button.id = "updatebutton"
            button.innerHTML = "Cập Nhật"
            button.onclick = function(){updateRes()}
            update_colum.appendChild(button)
            update_card.appendChild(update_colum)
        }
    }
    container.appendChild(update_card)
    form.appendChild(container)
}

//--------------------main--------------------------

if(macuahang === null || masothue === null){
    alert("Can't Update")
    location.href = "manage_restaurants.html"
}
else{
    displayUpdateRestaurant()
}
