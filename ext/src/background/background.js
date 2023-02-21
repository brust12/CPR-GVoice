chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      
        templates =[]
        let ip_instock =      {"name":"iPhone Screen- in stock",   "text":"We have your Screen in Stock at CPR Coon Rapids! Stop in Today, Walk-Ins Welcome! \nThe cost for your Screen Replacement is: \n-Standard Screen:$__\n-Apple OEM Screen: $__ (OEM screens need to be ordered)"}
        let geninstock =  {"name":"General in Stock",         "text":"We have your Part in Stock! Stop in Today, Walk-Ins Welcome!\nThe cost for your repair will be $___."}
        let genoutstock =  {"name":"General Out of Stock",    "text":"The cost for your repair is $___.\nThe part for this repair will need to be ordered. Please stop by so we can confirm your device and the issue. We'll see you soon!"}
        let applebatinstock =  {"name":"Apple Battery In Stock",  "text":"We have your Battery in Stock. Stop in Today, Walk-Ins Welcome!\nYour Battery Replacement will be $___.\n\nBefore Arriving: You will need to know your Apple ID password to turn off *Find My* for this Apple repair."}
        let genins =  {"name":"General in Stock",            "text":"We have your Part in Stock! Stop in Today, Walk-Ins Welcome!\nThe cost for your repair will be $___."}
        let genin =  {"name":"General in Stock",             "text":"We have your Part in Stock! Stop in Today, Walk-Ins Welcome!\nThe cost for your repair will be $___."}
        let geni =  {"name":"General in Stock",              "text":"We have your Part in Stock! Stop in Today, Walk-Ins Welcome!\nThe cost for your repair will be $___."}
        let gen =  {"name":"General in Stock",               "text":"We have your Part in Stock! Stop in Today, Walk-Ins Welcome!\nThe cost for your repair will be $___."}

        
        
        
        templates.push(ip_instock,geninstock,genoutstock,applebatinstock)
       
       chrome.storage.sync.set({ templates: templates });


        // chrome.storage.local.set({templates:defaults}, function() {console.log('Saved', key, testPrefs);})
    
    }
})


// function onStartUp(){
//     chrome.storage.local.get(("templates")).then((result) => {
//         console.log("Value currently is " + result.key);
//       });
// }

// onStartUp()


// async function postData(urll, dataa) {
//     // Default options are marked with *
//     // console.log(dataa);
//     const response = await fetch(urll, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc. 
//         headers: {
//             // 'Content-Type': 'application/json;charset=UTF-8',
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + btoa('ACfbad9682f0417ba0e785b0368b21241e:4d70d5a0b1dd7703f631195b3d2cbf11')
//         },
//         // body: JSON.stringify(dataa)// body data type must match "Content-Type" header
//         body: dataa,
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }


// const url = "https://api.twilio.com/2010-04-01/Accounts/ACfbad9682f0417ba0e785b0368b21241e/Messages.json";

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     var data = new FormData();
//     data.append('To', '+16519256782');
//     data.append('From', '+19706618106');
//     data.append('Body', msg.text);
//     if (msg.msg === 'send_SMS') {
//         let resp = postData(url, data).then((res) => {
//             sendResponse(res);
//             console.log(res)
//         });
//         return true;
//     }
// });




console.log("loaded");