var enabled = false; //disabled by default
var checkbox = document.getElementById('checkbox');
var label = document.getElementById('label');

let tab = null;

chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
  tab = tabArray[0];
});

chrome.storage.local.get('enabled', (data) => {
  enabled = !!data.enabled;
  label.textContent = enabled ? 'Enabled' : 'Disabled';
  checkbox.checked = enabled;
});

checkbox.onclick = () => {
  // Reload on enable/disable
  const code = 'window.location.reload();';

  const hostname = getDomain(tab.url);

  if (hostname === 'twitter.com') {
    chrome.tabs.executeScript(tab.id, { code: code });
  }

  enabled = !enabled;
  label.textContent = enabled ? 'Enabled' : 'Disabled';
  chrome.storage.local.set({ enabled: enabled });
};

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
