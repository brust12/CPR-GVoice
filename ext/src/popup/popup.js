// chrome.runtime.sendMessage({
//     action: 'openTab',
//     url: '/other-page.html',
//     data: {foo: 123, bar: [1, 2, 3], theme: 'dark'},
//   });






  // document.getElementById("button1").addEventListener("click",()=>alert("testing"));

  document.getElementById("templates").addEventListener("change",(event)=>
  {
    document.getElementById("textfield").value = event.target.value;
    console.log(event.target.value);
  }
  )


const sendMessageButton = document.getElementById('button1')
sendMessageButton.onclick = async function(e) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);

    chrome.tabs.sendMessage(tab[0].id, {msg: "grab_info"}, function(response) {
        let nameh1 = document.getElementById("name");
        let numberh1 = document.getElementById("number");
        msg_container = document.getElementById("textfield");
        msg_container.value = "hello"+response.name;
        numberh1.value = response.number;
        nameh1.textContent = response.name;
        console.log(response.status,response.name);
    });
    // chrome.tabs.create({active: true, url: "https://google.com"});
}

var g_voi = document.getElementById("button2");
g_voi.onclick = async function() {
  await chrome.runtime.sendMessage({msg: "cust_info"}).then((res)=>console.log(res)).catch((e)=>{console.log(e)});
  
  
};