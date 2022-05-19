chrome.runtime.sendMessage({
    action: 'openTab',
    url: '/other-page.html',
    data: {foo: 123, bar: [1, 2, 3], theme: 'dark'},
  });