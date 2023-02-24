//Add to manifest to make settings a popup:
// "options_ui": {
//     "page": "src/options/options.html",
//     "open_in_tab": false
//   },

// var addbtn = document.getElementById("add_btn");
// console.log(addbtn);
// addbtn.addEventListener("click", add);

// function add() {
//   console.log("working");
// }
let loca = document.getElementById("location_selection")
let greet = document.getElementById("storeGreetingInput")
loca.addEventListener("change", () => {
    chrome.storage.sync.set({ "location": loca.value })})



// SAVE STORE GREETING
document.getElementById("storeGreeting").addEventListener("click", function () {
    var greeting_text = document.getElementById("storeGreetingInput").value;
    console.log(greeting_text)
    if(greeting_text == ""){
      return
    }else{
      console.log("set greeting"+ greeting_text)
      chrome.storage.sync.set({"storeGreeting":greeting_text})
    }
    
});





///       ADD TEMPLATE        ///
document.getElementById("add-template").addEventListener("click", function () {
  var name = document.getElementById("template").value;
  var template_text = document.getElementById("temp-text").value;

  if(name == "" || template_text == ""){
    infoNotFilled(name,template_text)
    return
  }else{
    document.getElementById("errormsg").style.display = "none"
  }


  template ={"name":name,"text":template_text}

  chrome.storage.sync.get("templates", function (result) {
    var templates = result.templates || [];


    if(updateTemplate(templates)){
      alert("Template successfully updated!")
      
    }else{
      templates.push(template);
      console.log(templates)
      chrome.storage.sync.set({ templates: templates });
      alert("Template successfully added!")
    }

    displayTemplates(templates);
  });
});

function updateTemplate(templates){
  for (let index = 0; index < templates.length; index++) {
    if(templates[index]["name"] == document.getElementById("template").value){
      console.log("equal")
      templates[index]["text"] = document.getElementById("temp-text").value
      chrome.storage.sync.set({ templates: templates });
      return true
    }
  }
  return false
}

function infoNotFilled(name,template_text){
var errmsg = document.getElementById("errormsg")
errmsg.style.display = "inline"
errmsg.textContent = "Missing Fields"
}



///// DELETE TEMPLATE/////
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-template")) {
    if(!confirm("Are you sure you want to delete?")){
      return;
    }

    document.getElementById("showtemplate").textContent =""

    var template = event.target.dataset.template;

    chrome.storage.sync.get("templates", function (result) {
      var templates = result.templates || [];
      console.log(template)
      console.log(templates)
    //   var index = templates.indexOf(template);
      var index = templates.map(e=>e.name).indexOf(template)
      console.log(index)
      if (index !== -1) {
        templates.splice(index, 1);
        chrome.storage.sync.set({ templates: templates });
        displayTemplates(templates);
      }
    });
  }
});

///   DISPLAY TEMPLATES  ////

chrome.storage.sync.get("templates", function (result) {
  var templates = result.templates || [];
  displayTemplates(templates);
});


function displayTemplates(templates) {
  var templateList = document.getElementById("template-list");
  templateList.innerHTML = "";
  for (var i = 0; i < templates.length; i++) {
    var template = templates[i];
    var li = document.createElement("li");
    li.setAttribute("class","list-group-item temp-item")
    li.setAttribute("style","font-size: x-large")


    li.addEventListener("click",function(e){
      document.getElementById("showtemplate").value = e.currentTarget.getAttribute("value")
      fillSelectectTemplate(e)
      // console.log(e.currentTarget.dataset.value)
      clearSelected()
      e.currentTarget.setAttribute("class",e.currentTarget.getAttribute("class") + " selected")
    })
    li.textContent = template["name"]
    li.setAttribute("value",template["text"])

    //Add value to list item so on click it will show in text box

    var button = document.createElement("button");


    button.textContent = "Remove";
    button.setAttribute("class", "remove-template btn btn-primary");
    button.setAttribute("data-template", template["name"]);
    button.setAttribute("style","float:right;")



    li.setAttribute("draggable", "true");
    li.setAttribute("data-index", i);
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);


    li.appendChild(button);
    templateList.appendChild(li);
  }
};


function fillSelectectTemplate(e){
let temp_text = e.currentTarget.getAttribute("value")
let temp_name = e.currentTarget.firstChild.textContent
console.log(temp_text)
document.getElementById("template").value = temp_name
document.getElementById("temp-text").value = temp_text
}


function clearSelected(){
  var lis = document.getElementsByClassName("selected")[0]
    if(lis){
      lis.removeAttribute("class")
      lis.setAttribute("class","list-group-item temp-item")
    }

};



// handle drag start
function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.getAttribute("data-index"));
  event.dataTransfer.effectAllowed = "move";

  // if (event.dataTransfer.setDragImage) {
  //   var dragImage = event.target.cloneNode(true);
  //   dragImage.style.opacity = "0.8"; // set opacity to 80%
  //   event.dataTransfer.setDragImage(dragImage, 0, -10);
  // }
}

// handle drag over
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

// handle drop
function handleDrop(event) {
  event.preventDefault();
  var sourceIndex = event.dataTransfer.getData("text/plain");
  var targetIndex = event.target.getAttribute("data-index");
  if (sourceIndex !== targetIndex) {
    chrome.storage.sync.get("templates", function(result) {
      var templates = result.templates || [];
      var sourceTemplate = templates[sourceIndex];
      templates.splice(sourceIndex, 1);
      templates.splice(targetIndex, 0, sourceTemplate);
      chrome.storage.sync.set({ "templates": templates });
      displayTemplates(templates);
    });
  }
}

// listen for changes to the templates in chrome.storage
chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === "sync" && "templates" in changes) {
    var newTemplates = changes.templates.newValue || [];
    displayTemplates(newTemplates);
  }
});





chrome.storage.sync.get("location", function (result) {
  var location = result.location;
  loca.value = location;
});

chrome.storage.sync.get("storeGreeting", function (result) {
  var greeting = result.storeGreeting;
  // console.log(result)
  greet.setAttribute("placeholder",greeting)
  greet.value= ""
});


