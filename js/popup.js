var noSidebar = true;
var noNumbers = false;
var noPrompt = true;
var noAdvertisment = true;
var showPlatform = false;
var noTwitterBlue = true;

var sideBarCheck = document.getElementById('sidebar');
var numberCheck = document.getElementById('number');
var promptCheck = document.getElementById('prompt');
var sponsoredCheck = document.getElementById('sponsored');
var platformCheck = document.getElementById('platform');
var twitterBlueCheck = document.getElementById('twitterBlue');

let tab = null;

chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
  tab = tabs[0];
});

chrome.storage.local.get('noSidebar', (data) => {
  noSidebar = !!data.noSidebar;
  sideBarCheck.checked = noSidebar;
});

chrome.storage.local.get('noNumbers', (data) => {
  noNumbers = !!data.noNumbers;
  numberCheck.checked = noNumbers;
});

chrome.storage.local.get('noPrompt', (data) => {
  noPrompt = !!data.noPrompt;
  promptCheck.checked = noPrompt;
});

chrome.storage.local.get('noAdvertisment', (data) => {
  noAdvertisment = !!data.noAdvertisment;
  sponsoredCheck.checked = noAdvertisment;
});

chrome.storage.local.get('showPlatform', (data) => {
  showPlatform = !!data.showPlatform;
  platformCheck.checked = showPlatform;
});

chrome.storage.local.get('noTwitterBlue', (data) => {
  noTwitterBlue = !!data.noTwitterBlue;
  twitterBlueCheck.checked = noTwitterBlue;
});

if (sideBarCheck != null) {
  sideBarCheck.onclick = () => {
  reloadTab();

  noSidebar = !noSidebar;
  chrome.storage.local.set({ noSidebar: noSidebar });
  };
}

if (numberCheck != null) {
  numberCheck.onclick = () => {
  reloadTab();

  noNumbers = !noNumbers;
  chrome.storage.local.set({ noNumbers: noNumbers });
  };
}

if (promptCheck != null) {
  promptCheck.onclick = () => {
  reloadTab();

  noPrompt = !noPrompt;
  chrome.storage.local.set({ noPrompt: noPrompt });
  };
}

if (sponsoredCheck != null) {
  sponsoredCheck.onclick = () => {
  reloadTab();

  noAdvertisment = !noAdvertisment;
  chrome.storage.local.set({ noAdvertisment: noAdvertisment });
  };
}

if (platformCheck != null) {
  platformCheck.onclick = () => {
  reloadTab();

  showPlatform = !showPlatform;
  chrome.storage.local.set({ showPlatform: showPlatform });
  };
}

if (twitterBlueCheck != null) {
  twitterBlueCheck.onclick = () => {
  reloadTab();

  noTwitterBlue = !noTwitterBlue;
  chrome.storage.local.set({ noTwitterBlue: noTwitterBlue });
  };
}

function reloadCall() {
  window.location.reload();
}

function reloadTab() {

  const hostname = getDomain(tab.url);

  if (hostname === 'twitter.com') {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: reloadCall
    });
  }
}

function getDomain(url, subdomain) {
  subdomain = subdomain || false;

  url = url.replace(/(https?:\/\/)?(www.)?/i, '');

  if (!subdomain) {
    url = url.split('.');

    url = url.slice(url.length - 2).join('.');
  }

  if (url.indexOf('/') !== -1) {
    return url.split('/')[0];
  }

  return url;
}
