const BASE_URL = "https://ab3d-14-227-8-111.ap.ngrok.io"
let url = BASE_URL + "/api/addrestaurants";

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
// -------------Generate ID--------------------
String.prototype.hashCode = function() {
  var hash = 0,
  i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  const hashStr = hash.toString();
  if(hashStr[0] === '-'){
  return hashStr.replace("-","r")
  }
  return hashStr;
}


function createResponedDisplay(json){
    //----------------CREATE NEW DISPLAY--------------------
            //detele input tag
            const columClass = document.getElementsByClassName("colum")
            for(var i = columClass.length - 1; i >= 0; i--) {
                columClass[i].remove()
            }

            //remove sign up button
            const button = document.getElementsByClassName("button")
            button[0].remove()

            //get container
            const divContainer  = document.getElementsByClassName("container")
            //notify signed up successfully
            const p = document.getElementById("announce")
            p.innerHTML = "Chúc Mừng Bạn Đã Thêm Thành Công!! Thông Tin Cửa Hàng Là: "

            //Display information of restaurant
            const keys = Object.keys(json)
            for(let i = 0; i < keys.length; i++){
                const divcolum = document.createElement("div")
                divcolum.setAttribute("class","colum")
                const labelTitle = document.createElement("label")
                labelTitle.appendChild(document.createTextNode(toTextRestaurant[keys[i]]))
                const labelContent = document.createElement("label")
                labelContent.appendChild(document.createTextNode(json[keys[i]]))
                
                divcolum.appendChild(labelTitle)
                divcolum.appendChild(labelContent)
                divContainer[0].appendChild(divcolum)
            }
            
            const divbutton = document.createElement("div")// tag contain button
            divbutton.setAttribute("class", "button")
            //create new button to link manage_retaurants page
            const toMenuPagebutton = document.createElement("button")
            toMenuPagebutton.setAttribute("id", "signupButton")//set id
            toMenuPagebutton.innerHTML = "Quản Lý Cửa Hàng"
            toMenuPagebutton.onclick = function(){ //set new onclick funtion
                location.href = "manage_restaurants.html"
            }

            // create reload button
            const reloadButton = document.createElement("button")
            reloadButton.setAttribute("id", "signupButton")//set id
            reloadButton.innerHTML = "Thêm Cửa Hàng Mới"
            reloadButton.onclick = function(){ //set new onclick funtion
                location.reload()
            }
            divbutton.appendChild(toMenuPagebutton)
            divbutton.appendChild(reloadButton)
            const body = document.getElementsByTagName("body")
            body[0].appendChild(divbutton)
}

function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}
// -------------------------main------------------------------
const masothue = sessionStorage.getItem("masothue")

if(masothue === null){
    location.href = '/login/'
}

const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jsonObject = getData(e.target);
    jsonObject["masothue"] = masothue
    const StrMaCH = jsonObject.masothue + jsonObject.tenquan
    const macuahang = "CH" + StrMaCH.hashCode()
    jsonObject["macuahang"] = macuahang
    console.log("thong tin cua hang: ",jsonObject)
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
        console.log("respons: ",json);
        //check error insert parner into db
        let keys = Object.keys(json[0])
        if (keys[0] === "ERROR"){
            let data = JSON.stringify(json[0].ERROR)
            alert(keys[0] + ' : ' + data)
            console.log(data)
        }
        else {
            createResponedDisplay(json[0])
        }
        
    } catch (e) {
        formEl.innerHTML = e.message;
    }
});

