/**
 * @author Riley Brust <brust.developer@gmail.com>
 * @version 0.0.1
 * @description Chrome extention to add SMS to RepairQ.
 * @file inject.js
 */



let custname,custnumber = "";

 chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.msg === "grab_info") 
        var info= grabCustomerInfo();
        console.log(info);
        if(!info){
            sendResponse({status:"error"})
        }else{
            sendResponse({status: "done",name:custname,number:custnumber });
        }
    }
);

function grabCustomerInfo(){
    let number_a = document.querySelector('a[style="display:block;padding:15px 10px;text-decoration:none;color:#ff5e5b"]');
    if(!number_a){
        return false;
    }
    let child = number_a.lastElementChild;
    let phone_number = child.textContent;
    phone_number = phone_number.replace(/\D/g,'');
    let c_name = document.evaluate("/html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div[1]/div/div/div/table/tr/td[1]/div[2]/div[2]/div/div[3]/div/div/div/div/div/div[1]/div[2]/div[3]/div[3]/div/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr/th[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr[2]/td",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    console.log(c_name);
    custname = c_name;
    custnumber = phone_number;

    console.log(phone_number);
    let tt = document.querySelector('a[style="display:block;padding:15px 10px;text-decoration:none;color:#ff5e5b"]');
    // tt.innerHTML = tt.textContent.replace("CALL","TEXT");
    tt.removeAttribute("href");
    return true;
   
}