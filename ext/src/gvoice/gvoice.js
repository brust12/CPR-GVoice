chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "cust_info") {
        console.log("info recieved!");
        sendResponse({status: "done"});
      }
    }
);
console.log("loaded");