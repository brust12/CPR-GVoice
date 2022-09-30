chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "insert") {
            console.log("info recieved!");
            var message_field = document.getElementById("input_0");
            message_field.value = request.temp;
            var ev = new Event("change");
            message_field.dispatchEvent(ev);
            sendResponse({status: "done"});
        }
    }
);
console.log("loaded");