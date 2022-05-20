// chrome.runtime.sendMessage({
//     action: 'openTab',
//     url: '/other-page.html',
//     data: {foo: 123, bar: [1, 2, 3], theme: 'dark'},
//   });

  document.getElementById("button1").addEventListener("click",()=>alert("testing"));

  document.getElementById("templates").addEventListener("change",(event)=>
  {
    document.getElementById("textfield").value = event.target.value;
    console.log(event.target.value);
  }
  )