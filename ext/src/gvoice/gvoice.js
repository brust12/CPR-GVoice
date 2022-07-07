chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "insert") {
            console.log("info recieved!");
            var mess = document.getElementById("input_0");
            mess.value = request.temp;
            var ev = new Event("change");
            mess.dispatchEvent(ev);
            sendResponse({ status: "done" });
        }
    }
);
console.log("loaded");