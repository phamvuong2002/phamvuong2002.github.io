//const url = "https://webhook.site/f1de2a56-4094-4692-bacb-d4013b7e67de";
const url = "http://localhost:8080/api/addparner";
//--------------------------TEST public API------------------
// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/addparner";



function createResponedDisplay(json){
    //----------------CREATE NEW DISPLAY--------------------
            //get values of resopned JSON
            let myObj = json[0][0]
            console.log(myObj)
            delete myObj['MANV']
            delete myObj['MK']
            const keys = Object.keys(myObj)

            //delete nodisplay
            const nodisplay = document.getElementById("nodisplay")
            nodisplay.remove()
            //detele input tag
            const inputtag = document.getElementsByTagName("INPUT")
            for(var i = 0; i < inputtag.length; i++) {
                inputtag[i].remove()
                i = 0
            }
            inputtag[0].remove()

            //get class colum
            const colum = document.getElementsByClassName("colum")
            document.getElementById('annouce').innerText = 'Chúc Mừng Bạn Đã Đăng Ký Thông Tin Thành Công. Hợp Đồng '+ json[1][0].MAHOPDONG + ' Đang Chờ Duyệt. Chúng tôi sẽ gửi thư phản hồi trong vòng từ 3-5 ngày vào email đã đăng ký: '+ myObj['EMAIL']

            for (let i = 0 ; i< colum.length; i++)
            {   
                //create new h4 to display signed up info
                const h4 = document.createElement("h4")
                h4.appendChild(document.createTextNode(myObj[keys[i]]))
                colum[i].appendChild(h4)
            }
            
            //remove sign up button
            const button = document.getElementById("signupButton")
            button.remove()

            //create new button to link manage_menu page
            const divbutton = document.getElementsByClassName("button")// tag contain button
            const newbutton = document.createElement("button")
            newbutton.setAttribute("id", "signupButton")//set id
            newbutton.appendChild(document.createTextNode("Đăng Ký Mới"))
            newbutton.type = "tomenupage" //set new type
            newbutton.onclick = function(){ //set new onclick funtion
                location.reload()
            }
            divbutton[0].appendChild(newbutton)
}

function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}
  
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jsonObject = getData(e.target);
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
        
        console.log(json);

        //check error insert parner into db
        let keys = Object.keys(json[0][0])
        if (keys[0] === "ERROR"){
            let data = JSON.stringify(json[0][0].ERROR)
            alert(keys[0] + ' : ' + data)
            console.log(data)
        }
        else {
            createResponedDisplay(json)
        }
        
    } catch (e) {
        formEl.innerHTML = e.message;
    }
});

