// document.getElementById("button1").addEventListener("click",()=>alert("testing"));

//Change Greeting based on locatiom when template is selected
// var loca = document.getElementById("locations");
// document.getElementById("templates").addEventListener("change", (event) => {
//     document.getElementById("textfield").value = "Hi ___!, it's CPR " + loca.value + event.target.value;

// });

//Save location on change
// chrome.storage.sync.get("location", function(result) {
//     console.log(result);
//     loca.value = result.location;
// })

//Add store location greeting when location is changed
// loca.addEventListener("change", (e) => {
//     chrome.storage.sync.set({ "location": loca.value }, function() {});
//     var tex = document.getElementById("templates").value;
//     var sel_id = document.getElementById("templates").id;
//     document.getElementById("textfield").value = "Hi ___!, it's CPR " + loca.value + tex;
    
// })

var location_text ={
  "Coon Rapids": "Hi ___, It's CPR Coon Rapids!\n",
  "Woodbury":"Hi ___, It's CPR Woodbury!\n",
  "Eden Prairie": "Hi ___, It's CPR Eden Prairie!\n",
  "Burnsville": "Hi ___, It's CPR Burnsville!\n",
  "Hudson" : "Hi ___, It's CPR Hudson!\n"
};


var template_list = document.getElementById("template-list")
template_list.addEventListener("change",(e)=>{

    if(document.getElementById("ckbx4greeting").checked){
      chrome.storage.sync.get("location",function(result){
        let greeting = location_text[result.location]
        new_text = greeting + template_list.value;
        document.getElementById("textfield").value = new_text;
      })
    }else{
      document.getElementById("textfield").value =  template_list.value;
    }

   

})

var checkboxgreeting = document.getElementById("ckbx4greeting")
checkboxgreeting.addEventListener("change",(e)=>{
  if(e.target.checked){
    console.log("Checked")
    chrome.storage.sync.get("location",function(result){
      let greeting = location_text[result.location]
      new_text = greeting + template_list.value;
      document.getElementById("textfield").value = new_text;
    })
  }else{
    console.log("UnChecked")
    document.getElementById("textfield").value =  template_list.value;


  }
}
)


// var response_label = document.getElementById('response');

// //GRAB DATA IN GMAIL
// const get_data_btn = document.getElementById('get_data')
// get_data_btn.onclick = async function(e) {
//     //Check if URL is gmail otherwise listening script isnt running//DONE
//     let queryOptions = { active: true, currentWindow: true };
//     let tab = await chrome.tabs.query(queryOptions);

//     chrome.tabs.sendMessage(tab[0].id, { msg: "grab_info" }, function(response) {
//         var lastError = chrome.runtime.lastError;
//         if (lastError) {
//             console.log(lastError.message);
//             // 'Could not establish connection. Receiving end does not exist.'
//             return;
//         }
//         //FILL TEXT FIELDS IF DATA WAS GRABBED
//         let name = document.getElementById("name");
//         let number = document.getElementById("number");
//         msg_container = document.getElementById("textfield");
//         if (response.status == "done") {
//             msg_container.value = "hello" + response.name;
//             number.value = response.number;
//             name.textContent = response.name;
//             console.log(response.status, response.name);
//         } else {
//             response_label.textContent = response.status;
//         }
//     });
// }



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



var clear = document.getElementById("clear")
clear.onclick = function(){
    document.getElementById("textfield").value = "";
    document.getElementById("ckbx4greeting").checked = false;
}



document.querySelector('#go-to-options').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('src/options/options.html'));
    }
  });


    // get the list of templates and display them
function displayTemplates(templates) {
    var templateList = document.getElementById("template-list");
    templateList.innerHTML = "";
    var asktoselect = document.createElement("option");
    asktoselect.textContent = " "

    templateList.appendChild(asktoselect)
    for (var i = 0; i < templates.length; i++) {
      var template = templates[i];
      var li = document.createElement("option");
      li.textContent = template["name"];
      li.value = template["text"]
      templateList.appendChild(li);
    }
  }
  
  
  // listen for changes to the templates in chrome.storage
  chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && "templates" in changes) {
      var newTemplates = changes.templates.newValue || [];
      displayTemplates(newTemplates);
    }
  });
  
  // get the list of templates from chrome.storage and display them
  chrome.storage.sync.get("templates", function(result) {
    var templates = result.templates || [];
    displayTemplates(templates);
  });


document.getElementById("textfield").value = "";