const BASE_URL = "https://2fe2-113-187-79-109.jp.ngrok.io"
sessionStorage.setItem('baseUrl', BASE_URL) //local storage BASE_URL
let url = ""
let url_destination = ""
let role = ""
function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}
function partnerLogin(){
    url = ""
    url = BASE_URL + "/api/login/partner"
    url_destination = ""
    url_destination = url_destination + "/partner/"
    role = ""
    role = role + "partner"
}
function shipperLogin(){
    url = ""
    url = BASE_URL + "/api/login/driver"
    url_destination = ""
    url_destination = url_destination + "/driver/homepage"
    role = ""
    role = role + "driver"
}
function staffLogin(){
    url = ""
    url = BASE_URL + "/api/login/staff"
    url_destination = ""
    url_destination = url_destination + "/staff/homepage"
    role = ""
    role = role + "staff"
}
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jsonObject = getData(e.target);
    console.log(jsonObject)
    console.log('fetch url:',url)
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

        //check error insert parner into db
        let keys = Object.keys(json[0])
        if (keys[0] === "ERROR"){
            let data = JSON.stringify(json[0].ERROR)
            alert(keys[0] + ' : ' + data)
            console.log(data)
        }
        else {
            if(role === "partner"){
                sessionStorage.setItem("masothue", json[0].MASOTHUE);
            }
            if(role === "driver"){
                sessionStorage.setItem("jsondriver", JSON.stringify(json[0]));
            }
            if(role === "staff"){
                sessionStorage.setItem("jsonstaff", JSON.stringify(json[0]));
            }
            location.href = url_destination
        }
        
    } catch (e) {
        formEl.innerHTML = e.message;
    }
});

