
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "insert") {
            console.log("info recieved!");
            var message_field = document.getElementById("input_1");
            message_field.click
            message_field.value = request.temp;
            
            var ev = new Event("change");
            message_field.dispatchEvent(ev);
            // loadTemplates("https://www.googleapis.com/drive/v3/files/1WlkhplRW_hhRA3XO0rN_NECqdA3k3QcV")
            sendResponse({status: "done"});
        }
    }
);
console.log("background loaded");

// https://drive.google.com/uc?export=download&id=1WlkhplRW_hhRA3XO0rN_NECqdA3k3QcV
// https://world.openfoodfacts.org/category/pastas/1.json

function loadTemplates(url){
    var request = new XMLHttpRequest();
      request.onreadystatechange = function(){
          if(request.readyState !== 4) {
              return;
          }
          if(request.status !== 200){
              return;
          }
          var file_text = request.responseText
          console.log(file_text)
      };
      request.open('GET', url);
    //   request.setRequestHeader("Access-Control-Allow-Origin","*")
      request.send();
  }