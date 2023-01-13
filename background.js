chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.indexOf('chrome://') == -1) {
    chrome.scripting.executeScript({
      files: ['contentScript.js'],
      target: { tabId: tab.id }
    });
  }
});

