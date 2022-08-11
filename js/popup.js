var noSidebar = true;
var noNumbers = false;
var noPrompt = true;
var noAdvertisment = true;

var checkbox1 = document.getElementById("checkbox1");
var label1 = document.getElementById("label1");

var checkbox2 = document.getElementById("checkbox2");
var label2 = document.getElementById("label2");

var checkbox3 = document.getElementById("checkbox3");
var label3 = document.getElementById("label3");

var checkbox4 = document.getElementById("checkbox4");
var label4 = document.getElementById("label4");

if (label1 != null) label1.textContent = "Hide Sidebars";
if (label2 != null) label2.textContent = "Hide Numbers";
if (label3 != null) label3.textContent = "Hide Prompts";
if (label4 != null) label4.textContent = "Hide sponsored Tweets";

let tab = null;

chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
  tab = tabs[0];
});

chrome.storage.local.get("noSidebar", (data) => {
  noSidebar = !!data.noSidebar;
  checkbox1.checked = noSidebar;
});

chrome.storage.local.get("noNumbers", (data) => {
  noNumbers = !!data.noNumbers;
  checkbox2.checked = noNumbers;
});

chrome.storage.local.get("noPrompt", (data) => {
  noPrompt = !!data.noPrompt;
  checkbox3.checked = noPrompt;
});

chrome.storage.local.get("noAdvertisment", (data) => {
  noAdvertisment = !!data.noAdvertisment;
  checkbox4.checked = noAdvertisment;
});

if (checkbox1 != null) {
  checkbox1.onclick = () => {
    reloadTab();

    noSidebar = !noSidebar;
    chrome.storage.local.set({ noSidebar: noSidebar });
  };
}

if (checkbox2 != null) {
  checkbox2.onclick = () => {
    reloadTab();

    noNumbers = !noNumbers;
    chrome.storage.local.set({ noNumbers: noNumbers });
  };
}

if (checkbox3 != null) {
  checkbox3.onclick = () => {
    reloadTab();

    noPrompt = !noPrompt;
    chrome.storage.local.set({ noPrompt: noPrompt });
  };
}

if (checkbox4 != null) {
  checkbox4.onclick = () => {
    reloadTab();

    noAdvertisment = !noAdvertisment;
    chrome.storage.local.set({ noAdvertisment: noAdvertisment });
  };
}

function reloadCall() {
  window.location.reload();
}

function reloadTab() {
  const hostname = getDomain(tab.url);

  if (hostname === "twitter.com") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: reloadCall,
    });
  }
}

function getDomain(url, subdomain) {
  subdomain = subdomain || false;

  url = url.replace(/(https?:\/\/)?(www.)?/i, "");

  if (!subdomain) {
    url = url.split(".");

    url = url.slice(url.length - 2).join(".");
  }

  if (url.indexOf("/") !== -1) {
    return url.split("/")[0];
  }

  return url;
}
