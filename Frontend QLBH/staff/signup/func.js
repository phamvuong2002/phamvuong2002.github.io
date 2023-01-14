const url = "http://localhost:8080/api/staff/createstaff";

function createResponedDisplay(json){
    //----------------CREATE NEW DISPLAY--------------------
    // console.log("tAO DA TOI DAY",json)
            //get values of resopned JSON
            let myObj = json
            // delete myObj['MANV']
            

            //detele input tag
            const inputtag = document.getElementsByTagName("INPUT")
            for(var i = 0; i < inputtag.length; i++) {
                inputtag[i].remove()
                i = 0
            }
            inputtag[0].remove()

            //get class colum
            const colum = document.getElementsByClassName("colum")
            document.getElementById('annouce').innerText = 'Chúc Mừng Bạn Đã Đăng Ký Thông Tin Thành Công. Chúng tôi đã gửi thư phản hồi vào email đã đăng ký: '+ myObj['EMAIL']
            const macuahang = json.MANV
            delete json['MANV']
            const keys = Object.keys(myObj)
            
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
                location.href = "/staff/homepage/index.html"
            }
            divbutton[0].appendChild(newbutton)
}


function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}

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
    return hashStr.replace("-","NV")
  }
  return hashStr;
}
  
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jsonObject = getData(e.target);
    const StrMaNV = jsonObject.CMND + jsonObject.HOTEN
    const MANV = StrMaNV.hashCode()
    jsonObject["MANV"] = MANV
    console.log("thong tin NV: ",jsonObject)
    console.log(jsonObject)
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
        
        // console.log("tAO DA TOI DAY",json.recordset);
        var dataObject = json;
        //check error insert parner into db
        let keys = Object.keys(dataObject[0])
        if (keys[0] === "ERROR"){
            let data = JSON.stringify(dataObject[0].ERROR)
            alert(keys[0] + ' : ' + data)
            // console.log(data)
        }
        else {
            createResponedDisplay(dataObject[0])
        }
        
    } catch (e) {
        formEl.innerHTML = e.message;
    }
});