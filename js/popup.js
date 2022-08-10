var noSidebar = true; //enabled by default
var noNumbers = false; //disabled by default
var noLoginPrompt = false; //disabled by default

var checkbox1 = document.getElementById('checkbox1');
var label1 = document.getElementById('label1');

var checkbox2 = document.getElementById('checkbox2');
var label2 = document.getElementById('label2');

var checkbox3 = document.getElementById('checkbox3');
var label3 = document.getElementById('label3');

label1.textContent = 'Hide Sidebars';
label2.textContent = 'Hide Numbers';
label3.textContent = 'Hide Login prompts';

let tab = null;

chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
  tab = tabArray[0];
});

chrome.storage.local.get('noSidebar', (data) => {
  noSidebar = !!data.noSidebar;
  checkbox1.checked = noSidebar;
});

chrome.storage.local.get('noNumbers', (data) => {
  noNumbers = !!data.noNumbers;
  checkbox2.checked = noNumbers;
});

chrome.storage.local.get('noLoginPrompt', (data) => {
  noLoginPrompt = !!data.noLoginPrompt;
  checkbox3.checked = noLoginPrompt;
});

checkbox1.onclick = () => {
  reloadTab();

  noSidebar = !noSidebar;
  chrome.storage.local.set({ noSidebar: noSidebar });
};

checkbox2.onclick = () => {
  reloadTab();

  noNumbers = !noNumbers;
  chrome.storage.local.set({ noNumbers: noNumbers });
};

checkbox3.onclick = () => {
  reloadTab();

  noLoginPrompt = !noLoginPrompt;
  chrome.storage.local.set({ noLoginPrompt: noLoginPrompt });
};

function reloadTab() {
  const code = 'window.location.reload();';

  const hostname = getDomain(tab.url);

  if (hostname === 'twitter.com') {
    chrome.tabs.executeScript(tab.id, { code: code });
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
