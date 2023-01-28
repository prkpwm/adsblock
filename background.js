
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url) {
    chrome.storage.local.get(['url'], function (result) {
      if (result.url) {
        const BLOCKED_URL = result.url;
        for (const url of BLOCKED_URL) {
          if (url.status && tab.url.match(url.name)) {
            chrome.tabs.update(tabId, { url: 'https://www.google.com' })
          }
        }
      }
    });
  }

  if (tab.url && tab.url.indexOf('chrome://') == -1) {
    chrome.scripting?.executeScript({
      files: ['contentScript.js'],
      target: { tabId: tab.id }
    });
  }
});

