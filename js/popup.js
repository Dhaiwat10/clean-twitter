var enabled = false; //disabled by default
var myButton = document.getElementById('toggle');

let tab = null;

chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
  tab = tabArray[0];
});

chrome.storage.local.get('enabled', data => {
  enabled = !!data.enabled;
  myButton.textContent = enabled ? 'Disable' : 'Enable';
});

myButton.onclick = () => {
  // Reload on enable/disable
  const code = 'window.location.reload();';
  chrome.tabs.executeScript(tab.id, { code: code });

  enabled = !enabled;
  myButton.textContent = enabled ? 'Disable' : 'Enable';
  chrome.storage.local.set({ enabled: enabled });
};
