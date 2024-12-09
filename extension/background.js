// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.loginPageDetected) {
      // Enable the popup on login pages
      chrome.action.enable(sender.tab.id);
    } else {
      // Disable the popup on non-login pages
      chrome.action.disable(sender.tab.id);
    }
  });
  