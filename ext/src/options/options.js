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

document.getElementById("add-template").addEventListener("click", function () {
  var name = document.getElementById("template").value;
  var template_text = document.getElementById("temp-text").value;
  template ={"name":name,"text":template_text}

  chrome.storage.sync.get("templates", function (result) {
    var templates = result.templates || [];
    templates.push(template);
    chrome.storage.sync.set({ templates: templates });
    displayTemplates(templates);
  });
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-template")) {
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

function displayTemplates(templates) {
  var templateList = document.getElementById("template-list");
  templateList.innerHTML = "";
  for (var i = 0; i < templates.length; i++) {
    var template = templates[i];
    var li = document.createElement("li");
    li.textContent = template["name"]
    var button = document.createElement("button");
    button.textContent = "Remove";
    button.setAttribute("class", "remove-template");
    button.setAttribute("data-template", template["name"]);
    li.appendChild(button);
    templateList.appendChild(li);
  }
}

chrome.storage.sync.get("templates", function (result) {
  var templates = result.templates || [];
  displayTemplates(templates);
});
