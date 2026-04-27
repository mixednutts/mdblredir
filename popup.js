const masterCheckbox = document.getElementById('master');
const servicesEl = document.getElementById('services');
const serviceIds = ['imdb', 'trakt', 'tmdb', 'tvdb', 'simkl'];

function loadState() {
  chrome.storage.local.get(['mdblredirEnabled', 'services'], (result) => {
    const enabled = result.mdblredirEnabled !== false;
    const services = result.services || {};

    masterCheckbox.checked = enabled;
    updateServicesVisibility(enabled);

    for (const id of serviceIds) {
      const cb = document.getElementById(id);
      if (cb) cb.checked = services[id] !== false; // default true
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

loadState();
