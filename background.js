chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.indexOf('chrome://') == -1) {
    chrome?.storage?.local?.get(['BLOCKED_URL'], function (result) {
      if (result.BLOCKED_URL) {
        const BLOCKED_URL = result.BLOCKED_URL;
        for (const url of BLOCKED_URL) {
          if (url.status && tab.url.match(url.name)) {
            chrome.tabs.update(tabId, { url: 'https://www.google.com' })
          }
        }
      }
    });
    chrome.scripting?.executeScript({
      files: ['contentScript.js'],
      target: { tabId: tab.id }
    });
  }
});

