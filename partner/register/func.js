const BASE_URL = "https://ab3d-14-227-8-111.ap.ngrok.io"
let url = BASE_URL + "/api/addparner";
var toTextMenuItem ={
    "PHIDANGKY": "Phí đăng kí",
    "TINHTRANGNOPPHI": "Tình trạng nộp phí"
}

function createResponedDisplay(json){
    //----------------CREATE NEW DISPLAY--------------------
    // console.log("tAO DA TOI DAY",json)
            //get values of resopned JSON
            let myObj = json
            // delete myObj['MATX']
            

            //detele input tag
            const inputtag = document.getElementsByTagName("INPUT")
            for(var i = 0; i < inputtag.length; i++) {
                inputtag[i].remove()
                i = 0
            }
            inputtag[0].remove()

            //get class colum
            const column = document.getElementsByClassName("column")
            document.getElementById('annouce').innerText = 'Chúc Mừng Bạn Đã Đăng Ký Thông Tin Thành Công. Vui lòng nộp lệ phí vào STK:141414 để kích hoạt tài khoản Chúng tôi sẽ gửi thư phản hồi sau khi nộp lệ phí vào email đã đăng ký: '+ myObj['EMAIL']
            const macuahang = json.MATX
            delete json['MATX']
            const keys = Object.keys(myObj)

            console.log('key:',keys)
            console.log('my:',myObj)
            

            for (let i = 0; i < 2; i++) {
                const newLabel = document.createElement('label')
                newLabel.setAttribute("class", "row")
                newLabel.appendChild(document.createTextNode(toTextMenuItem[keys[keys.length - 2 + i]]))
                column[1].appendChild(newLabel)

            }
            
            const label = document.getElementsByClassName("row")
            for (let i = 0 ; i< label.length; i++)
            {   
                //create new h4 to display signed up info
                const h3 = document.createElement("h3")
                h3.appendChild(document.createTextNode(myObj[keys[i]]))
                label[i].appendChild(h3)
            }
            
            //remove sign up button
            const button = document.getElementById("signupButton")
            button.remove()

            //create new button to link DH_CHO
            const divbutton = document.getElementsByClassName("reg-button")// tag contain button
            const newbutton = document.createElement("button")
            newbutton.setAttribute("id", "nextLink")//set id
            newbutton.appendChild(document.createTextNode("Home Page"))
            // newbutton.type = "tomenupage" //set new type
            newbutton.onclick = function(){ //set new onclick funtion
                location.href = "../homepage/index.html"
            }
            divbutton[0].appendChild(newbutton)
}


function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}

String.prototype.hashCodeForMA = function() {
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
    return hashStr.replace("-","E")
  }
  return hashStr;
}

  
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jsonObject = getData(e.target);
    const StrMaCH = jsonObject.CMND + jsonObject.HOTEN
    const MATX = StrMaCH.hashCodeForMA()
    jsonObject["MATX"] = 'TX'+MATX
    jsonObject["PHIDANGKY"] = 1000
    jsonObject["TINHTRANGNOPPHI"] = 'Chưa Nộp'
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
        console.log("data return ",json)
        //check error 
        let keys = Object.keys(json[0])
        if (keys[0] === "ERROR"){
            let data = JSON.stringify(json[0].ERROR)
            alert(keys[0] + ' : ' + data)
            // console.log(data)
        }
        else {
            createResponedDisplay(json[0])
        }
        
    } catch (e) {
        formEl.innerHTML = e.message;
    }
});