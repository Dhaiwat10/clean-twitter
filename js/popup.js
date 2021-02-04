var enabled = false; //disabled by default
var checkbox = document.getElementById('checkbox');
var label = document.getElementById('label');

let tab = null;

chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
  tab = tabArray[0];
});

chrome.storage.local.get('enabled', data => {
  enabled = !!data.enabled;
  label.textContent = enabled ? 'Enabled' : 'Disabled';
  checkbox.checked = enabled;
});

checkbox.onclick = () => {
  // Reload on enable/disable
  const code = 'window.location.reload();';
  chrome.tabs.executeScript(tab.id, { code: code });

  enabled = !enabled;
  label.textContent = enabled ? 'Enabled' : 'Disabled';
  chrome.storage.local.set({ enabled: enabled });
};
