const masterCheckbox = document.getElementById('master');
const servicesEl = document.getElementById('services');
const apiKeyInput = document.getElementById('apikey-input');
const apiKeySave = document.getElementById('apikey-save');
const apiKeyToggle = document.getElementById('apikey-toggle');
const apiKeyStatus = document.getElementById('apikey-status');
const serviceIds = ['imdb', 'simkl', 'letterboxd', 'trakt', 'tmdb', 'tvdb'];

function loadState() {
  chrome.storage.local.get(['mdblredirEnabled', 'services', 'mdblistApiKey'], (result) => {
    const enabled = result.mdblredirEnabled !== false;
    const services = result.services || {};

    masterCheckbox.checked = enabled;
    updateServicesVisibility(enabled);

    for (const id of serviceIds) {
      const cb = document.getElementById(id);
      if (cb) cb.checked = services[id] !== false;
    }

    if (result.mdblistApiKey) {
      apiKeyInput.value = result.mdblistApiKey;
      apiKeyStatus.textContent = 'Saved';
      unlockServiceToggles(true);
    } else {
      unlockServiceToggles(false);
    }
  });
}

function updateServicesVisibility(enabled) {
  if (enabled) {
    servicesEl.classList.remove('disabled');
  } else {
    servicesEl.classList.add('disabled');
  }
}

function unlockServiceToggles(unlocked) {
  for (const id of serviceIds) {
    if (id === 'imdb' || id === 'simkl' || id === 'letterboxd') continue; // IMDB, SIMKL & Letterboxd are always unlocked
    const row = document.querySelector(`.toggle-row[data-service="${id}"]`);
    const cb = document.getElementById(id);
    const lock = row?.querySelector('.lock-hint');
    if (!row || !cb) continue;

    if (unlocked) {
      row.classList.remove('locked');
      cb.disabled = false;
      if (lock) lock.style.display = 'none';
    } else {
      row.classList.add('locked');
      cb.disabled = true;
      cb.checked = false;
      if (lock) lock.style.display = 'inline';
    }
  }
}

masterCheckbox.addEventListener('change', () => {
  const enabled = masterCheckbox.checked;
  chrome.storage.local.set({ mdblredirEnabled: enabled });
  updateServicesVisibility(enabled);
});

for (const id of serviceIds) {
  const cb = document.getElementById(id);
  if (!cb) continue;
  cb.addEventListener('change', () => {
    chrome.storage.local.get('services', (result) => {
      const services = result.services || {};
      services[id] = cb.checked;
      chrome.storage.local.set({ services });
    });
  });
}

apiKeySave.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  chrome.storage.local.set({ mdblistApiKey: key }, () => {
    apiKeyStatus.textContent = key ? 'Saved' : 'Cleared';
    unlockServiceToggles(!!key);
    setTimeout(() => { apiKeyStatus.textContent = ''; }, 2000);
  });
});

apiKeyToggle.addEventListener('click', () => {
  const isPassword = apiKeyInput.type === 'password';
  apiKeyInput.type = isPassword ? 'text' : 'password';
  apiKeyToggle.textContent = isPassword ? '🙈' : '👁';
});

loadState();
