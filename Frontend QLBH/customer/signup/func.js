const url = "http://localhost:8080/api/customer/signup"

function createResponedDisplay(json){
    //----------------CREATE NEW DISPLAY------------------
            let myObj = json
            
            const inputtag = document.getElementsByTagName("INPUT")
            for(var i = 0; i < inputtag.length; i++) {
                inputtag[i].remove()
                i = 0
            }
            inputtag[0].remove()

            //get class colum
            document.getElementById('annouce').innerText = 'Chúc Mừng Bạn Đã Đăng Ký Thông Tin Thành Công. Chúng tôi đã gửi thư phản hồi vào email đã đăng ký: '+ myObj['EMAIL']
            delete json['MAKH']
            const keys = Object.keys(myObj)
            
            const label = document.getElementsByClassName("form-row")
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
            newbutton.appendChild(document.createTextNode("Login"))
            // newbutton.type = "tomenupage" //set new type
            newbutton.onclick = function(){ //set new onclick funtion
                location.href = "/customer/login/index.html"
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
    return hashStr.replace(hashStr[0],"KH");
}
  
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jsonObject = getData(e.target);
    const StrMaKH = jsonObject.HOTEN + jsonObject.EMAIL 
    const MAKH = StrMaKH.hashCode()
    
    jsonObject["MAKH"] = MAKH
    
    localStorage.setItem('MAKH',MAKH)

    console.log("thong tin KH: ",jsonObject)
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
        
    
        var dataObject = json
        //check error insert parner into db
        let keys = Object.keys(dataObject[0])
        if (keys[0] === "ERROR"){
            let data = JSON.stringify(dataObject[0].ERROR)
            alert(keys[0] + ' : ' + data)

        }
        else {
            console.log(json)
            createResponedDisplay(dataObject[0])
        }
        
    } catch (e) {
        formEl.innerHTML = e.message;
    }
});