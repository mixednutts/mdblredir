const checkbox = document.getElementById('enabled');
const statusText = document.getElementById('status');

chrome.storage.local.get('mdblredirEnabled', (result) => {
  const enabled = result.mdblredirEnabled !== false; // default true
  checkbox.checked = enabled;
  statusText.textContent = enabled ? 'Enabled' : 'Disabled';
});

checkbox.addEventListener('change', () => {
  const enabled = checkbox.checked;
  chrome.storage.local.set({ mdblredirEnabled: enabled });
  statusText.textContent = enabled ? 'Enabled' : 'Disabled';
});
