chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      
        var key='temp1', testPrefs ="temp1";
        chrome.storage.local.set({key: testPrefs}, function() {console.log('Saved', key, testPrefs);})

    }
});


function onStartUp(){
    chrome.storage.local.get(["temp1"]).then((result) => {
        console.log("Value currently is " + result.key);
      });
}

onStartUp()


async function postData(urll, dataa) {
    // Default options are marked with *
    // console.log(dataa);
    const response = await fetch(urll, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc. 
        headers: {
            // 'Content-Type': 'application/json;charset=UTF-8',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa('ACfbad9682f0417ba0e785b0368b21241e:4d70d5a0b1dd7703f631195b3d2cbf11')
        },
        // body: JSON.stringify(dataa)// body data type must match "Content-Type" header
        body: dataa,
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


const url = "https://api.twilio.com/2010-04-01/Accounts/ACfbad9682f0417ba0e785b0368b21241e/Messages.json";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    var data = new FormData();
    data.append('To', '+16519256782');
    data.append('From', '+19706618106');
    data.append('Body', msg.text);
    if (msg.msg === 'send_SMS') {
        let resp = postData(url, data).then((res) => {
            sendResponse(res);
            console.log(res)
        });
        return true;
    }
});




console.log("loaded");