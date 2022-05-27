  // document.getElementById("button1").addEventListener("click",()=>alert("testing"));

  document.getElementById("templates").addEventListener("change",(event)=>
  {
    document.getElementById("textfield").value = event.target.value;

  }
  )


const sendMessageButton = document.getElementById('get_data')
sendMessageButton.onclick = async function(e) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);

    chrome.tabs.sendMessage(tab[0].id, {msg: "grab_info"}, function(response) {
        let name = document.getElementById("name");
        let number = document.getElementById("number");
        msg_container = document.getElementById("textfield");
        msg_container.value = "hello"+response.name;
        number.value = response.number;
        name.textContent = response.name;
        console.log(response.status,response.name);
    });
}

var g_voi = document.getElementById("send_message");
g_voi.onclick = async function() {
  let textfield = document.getElementById("textfield").value;
  await chrome.runtime.sendMessage({msg: "send_SMS",text:textfield}).then((res)=>document.getElementById('response').textContent = res.status+res.message).catch((e)=>{document.getElementById('response').textContent = res.message});

};
