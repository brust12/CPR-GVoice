function onTabLoaded(tabId) {
    return new Promise(resolve => {
      browser.tabs.onUpdated.addListener(function onUpdated(id, change) {
        if (id === tabId && change.status === 'complete') {
          browser.tabs.onUpdated.removeListener(onUpdated);
          resolve();
        }
      });
    });
  }
  
  browser.runtime.onMessage.addListener(async (msg = {}, sender) => {
    if (msg.action === 'openTab') {
      const tab = await browser.tabs.create({url: msg.url});
      await onTabLoaded(tab.id);
      await browser.tabs.sendMessage(tab.id, {
        action: 'setData',
        data: msg.data,
      });
    }
  });