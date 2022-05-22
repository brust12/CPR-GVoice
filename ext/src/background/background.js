// function onTabLoaded(tabId) {
//     return new Promise(resolve => {
//       window.tabs.onUpdated.addListener(function onUpdated(id, change) {
//         if (id === tabId && change.status === 'complete') {
//             chrome.tabs.executeScript(id,{file: "../inject/inject.js"});
//             console.log("updated");
//           browser.tabs.onUpdated.removeListener(onUpdated);
//           resolve();
//         }
//       });
//     });
//   }
  
//   chrome.runtime.onMessage.addListener(async (msg = {}, sender) => {
//     if (msg.action === 'openTab') {
//       const tab = await browser.tabs.create({url: msg.url});
//       await onTabLoaded(tab.id);
//       await browser.tabs.sendMessage(tab.id, {
//         action: 'setData',
//         data: msg.data,
//       });
//     }
//   });
chrome.tabs.addEventListener('load', () => {
    // Is service worker available?
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('src/background/background.js').then(() => {
        console.log('Service worker registered!');
      }).catch((error) => {
        console.warn('Error registering service worker:');
        console.warn(error);
      });
    }
  });




  console.log("loaded");