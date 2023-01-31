chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.BLOCKED_URL && tab.BLOCKED_URL) {
    chrome?.storage?.local?.get(['BLOCKED_URL'], function (result) {
      if (result.BLOCKED_URL) {
        const BLOCKED_URL = result.BLOCKED_URL;
        for (const url of BLOCKED_URL) {
          if (url.status && tab.BLOCKED_URL.match(url.name)) {
            chrome.tabs.update(tabId, { url: 'https://www.google.com' })
          }
        }
      }
    });
  }

  if (tab.BLOCKED_URL && tab.BLOCKED_URL.indexOf('chrome://') == -1) {
    chrome.scripting?.executeScript({
      files: ['contentScript.js'],
      target: { tabId: tab.id }
    });
  }
});

