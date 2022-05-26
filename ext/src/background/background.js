
  async function postData(urll, dataa) {
    // Default options are marked with *
    console.log(dataa);
    const response = await fetch(urll, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('ACfbad9682f0417ba0e785b0368b21241e:4d70d5a0b1dd7703f631195b3d2cbf11')
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: dataa, // body data type must match "Content-Type" header
    })
    return response.json(); // parses JSON response into native JavaScript objects
  }
  var url = "https://api.twilio.com/2010-04-01/Accounts/ACfbad9682f0417ba0e785b0368b21241e/Messages.json";
  var data = {"To": "+16519256782",
              "From": "+19706618106",
              "Body": "testing from chrome",};
  chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.msg === 'cust_info') {
      let resp =postData(url,data);
      console.log(resp);
    }
  });




  console.log("loaded");