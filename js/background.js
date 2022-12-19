let token = null;

chrome.webRequest.onSendHeaders.addListener(function (details) {

    details.requestHeaders.forEach((header, index) => {
        if (header.name == 'authorization') {
            token = header.value;
            console.log(token);
        }
    });
    
    },{urls: ["*://*.twitter.com/*"]}, ["requestHeaders"]
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-auth') {
      sendResponse(token);
    }
});