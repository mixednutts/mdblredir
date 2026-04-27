const apiKeyInput = document.getElementById('apikey');
const saveBtn = document.getElementById('save');
const statusEl = document.getElementById('status');

chrome.storage.local.get('mdblistApiKey', (result) => {
  if (result.mdblistApiKey) {
    apiKeyInput.value = result.mdblistApiKey;
  }
});

saveBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  chrome.storage.local.set({ mdblistApiKey: key }, () => {
    statusEl.textContent = 'Saved!';
    setTimeout(() => { statusEl.textContent = ''; }, 2000);
  });
});
