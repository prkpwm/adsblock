
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.indexOf('chrome://') == -1) {
    chrome.scripting?.executeScript({
      files: ['contentScript.js'],
      target: { tabId: tab.id }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let BLOCKED_URL = [
    'ads'
  ]
  chrome?.storage?.local?.get(['url'], function (result) {
    if (result.url) BLOCKED_URL = result.url;
    else chrome?.storage?.local?.set({ 'url': BLOCKED_URL }, () => { });
  });


  for (let i = 0; i < BLOCKED_URL.length; i++) {
    if (request?.url?.match(BLOCKED_URL[i])) {
      chrome.tabs.update(sender.tab.id, { url: 'https://www.google.com/' });
    }
  }
});