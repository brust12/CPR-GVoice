/**
 * @author Riley Brust <brust.developer@gmail.com>
 * @version 0.0.1
 * @description Chrome extention to add SMS to RepairQ.
 * @file inject.js
 */





 chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "grab_info") {
        let custname = grabCustomerInfo();
        sendResponse({status: "done",name:custname});
      }
    }
);

























function grabCustomerInfo(){
    let number_a = document.querySelector('a[style="display:block;padding:15px 10px;text-decoration:none;color:#ff5e5b"]');
    let child = number_a.lastElementChild;
    let phone_number = child.textContent;
    phone_number = phone_number.replace(/\D/g,'');
    let cust_name = document.evaluate("/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div/div/table/tr/td[1]/div[2]/div[2]/div/div[3]/div/div/div/div/div/div[1]/div[2]/div[3]/div[3]/div/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr/th[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr[2]/td",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    console.log(cust_name);


    console.log(phone_number);
    return cust_name;
}


function main(){
    //Check to see if were on a parts page or another page.
    let url = document.URL;
    let tt = document.querySelector('a[style="display:block;padding:15px 10px;text-decoration:none;color:#ff5e5b"]');
    console.log(tt);
    tt.removeAttribute("href");
    let child = tt.lastElementChild;
    // console.log(child);
    let text = child.textContent;
    text = text.replace(/\D/g,'');
    console.log(text);
    
   
}


// window.addEventListener ("load", myMain, false);

function myMain (evt) {
    var jsInitChecktimer = setInterval (checkForJS_Finish, 111);

    function checkForJS_Finish () {
        if (    typeof SOME_GLOBAL_VAR != "undefined"
            ||  document.querySelector ('a[style="display:block;padding:15px 10px;text-decoration:none;color:#ff5e5b"]')
        ) {
            clearInterval (jsInitChecktimer);
            grabCustomerInfo();
        }
    }
}


// chrome.tabs.onUpdated.addListener("load",function (tabId , info) {
//     if (info.status === 'complete') {
//         main();
//     }
//   });

// main();
/*
var ttt = document.getElementById("input_0")
ttt.value +="Hi Tim,

We have your Screen in Stock! Stop in Today, Walk-Ins Welcome!

The cost for your Screen Replacement is: 
Standard Screen: $100 
Apple OEM Screen: $200 

OEM Screen will need to be ordered
THIS IS AN AUTOMATED MESSAGE";
var ev = new Event("change");
ttt.dispatchEvent(ev);
document.getElementById("ib3").click();
*/


//GETTING PHONE NUMBER
/*
document.evaluate("/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div/table/tr/td[1]/div[2]/div[2]/div/div[3]/div/div/div/div/div/div[1]/div[2]/div[3]/div[3]/div/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr/th[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[3]/tbody/tr/td/table/tbody/tr/th[1]/table/tbody/tr/td/a/span/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
*/

//GETTING PRICE QUOTED
/*document.evaluate("/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div[2]/div/table/tr/td[1]/div[2]/div[2]/div/div[3]/div/div/div/div/div/div[1]/div[2]/div[3]/div[3]/div/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr/th[4]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr[6]/td", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
*/