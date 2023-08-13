chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension installed');
  });

  // Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.highlightedText) {
    // Store the highlighted text in chrome.storage or a variable
    // You can use chrome.storage.sync or chrome.storage.local for persistence
    chrome.storage.sync.set({ highlightedText: message.highlightedText });
  }
});