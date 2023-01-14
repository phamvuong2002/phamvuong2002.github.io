let url = ""
let url_destination = ""
let role = ""
function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}
function Login(){
    url = ""
    url = url + "http://localhost:8080/api/login/customer"
    url_destination = ""
    url_destination = url_destination + "/customer/index.html"
    role = ""
    role = role + "customer"
}

const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jsonObject = getData(e.target);
    console.log(jsonObject)
    console.log(url)
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
            if(role === "customer"){
                sessionStorage.setItem("jsoncustomer", JSON.stringify(json[0]));
            }
            location.href = url_destination
        }
        
    } catch (e) {
        formEl.innerHTML = e.message;
    }
});

