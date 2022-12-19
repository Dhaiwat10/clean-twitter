let token = null;

chrome.webRequest.onSendHeaders.addListener(function (details) {

    details.requestHeaders.forEach((header, index) => {
        if (header.name == 'authorization' || header.name == 'Authorization') {
            token = header.value;
        }
    });
    
    },{urls: ["*://*.twitter.com/*"]}, ["requestHeaders"]
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-auth') {
        if (token == null) {
            console.log('Null Token')
            sendResponse('NULL-TOKEN')
        }

        sendResponse(token);
    }
});