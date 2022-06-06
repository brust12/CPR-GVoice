// document.getElementById("button1").addEventListener("click",()=>alert("testing"));

document.getElementById("templates").addEventListener("change", (event) => {
    document.getElementById("textfield").value = event.target.value;

})

var response_label = document.getElementById('response');


const sendMessageButton = document.getElementById('get_data')
sendMessageButton.onclick = async function(e) {
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

var g_voi = document.getElementById("send_message");
g_voi.onclick = async function() {
    let textfield = document.getElementById("textfield").value;
    await chrome.runtime.sendMessage({ msg: "send_SMS", text: textfield })
        .then((res) => {
            if (res.message)
                response_label.textContent = "Error: " + res.message;

            else
            // response_label.textContent =  res.status; 
                response_label.textContent = "Message Sent!";


        })
        .catch((e) => { document.getElementById('response').textContent = res.status });

};