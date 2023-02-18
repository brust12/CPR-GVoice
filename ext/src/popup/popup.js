// document.getElementById("button1").addEventListener("click",()=>alert("testing"));

//Change Greeting based on locatiom when template is selected
var loca = document.getElementById("locations");
document.getElementById("templates").addEventListener("change", (event) => {
    document.getElementById("textfield").value = "Hi ___!, it's CPR " + loca.value + event.target.value;

});

//Save location on change
chrome.storage.sync.get("location", function(result) {
    console.log(result);
    loca.value = result.location;
})

//Add store location greeting when location is changed
loca.addEventListener("change", (e) => {
    chrome.storage.sync.set({ "location": loca.value }, function() {});
    var tex = document.getElementById("templates").value;
    var sel_id = document.getElementById("templates").id;
    document.getElementById("textfield").value = "Hi ___!, it's CPR " + loca.value + tex;
    
})


var response_label = document.getElementById('response');

//GRAB DATA IN GMAIL
const get_data_btn = document.getElementById('get_data')
get_data_btn.onclick = async function(e) {
    //Check if URL is gmail otherwise listening script isnt running//DONE
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);

    chrome.tabs.sendMessage(tab[0].id, { msg: "grab_info" }, function(response) {
        var lastError = chrome.runtime.lastError;
        if (lastError) {
            console.log(lastError.message);
            // 'Could not establish connection. Receiving end does not exist.'
            return;
        }
        //FILL TEXT FIELDS IF DATA WAS GRABBED
        let name = document.getElementById("name");
        let number = document.getElementById("number");
        msg_container = document.getElementById("textfield");
        if (response.status == "done") {
            msg_container.value = "hello" + response.name;
            number.value = response.number;
            name.textContent = response.name;
            console.log(response.status, response.name);
        } else {
            response_label.textContent = response.status;
        }
    });
}



var insert = document.getElementById("insert");
insert.onclick = async function(e) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);
    var text_to_insert = document.getElementById("textfield").value;
    chrome.tabs.sendMessage(tab[0].id, { msg: "insert", temp: text_to_insert }, function(response) {
        var lastError = chrome.runtime.lastError;
        if (lastError) {
            console.log(lastError.message);
            // 'Could not establish connection. Receiving end does not exist.'
            return;
        }

    });
    // chrome.tabs.create({active: true, url: "https://google.com"});
}