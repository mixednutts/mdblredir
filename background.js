const cache = new Map();

const SERVICES = {
  imdb: {
    pattern: /https?:\/\/(www\.)?imdb\.com\/title\/(tt\d+)/i,
    async resolve(id) {
      const movieUrl = `https://mdblist.com/movie/${id}`;
      const showUrl = `https://mdblist.com/show/${id}`;

      try {
        const res = await fetch(movieUrl, { method: 'HEAD', redirect: 'manual', cache: 'no-store' });
        if (res.status === 301 || res.ok) return movieUrl;
      } catch (_) {}

      try {
        const res = await fetch(showUrl, { method: 'HEAD', redirect: 'manual', cache: 'no-store' });
        if (res.status === 301 || res.ok) return showUrl;
      } catch (_) {}

      return movieUrl;
    }
  },

  trakt: {
    pattern: /https?:\/\/(www\.)?trakt\.tv\/(movies|shows)\/([^/?]+)/i,
    async resolve(id) {
      // TODO: determine correct MDBLIST URL for Trakt IDs/slugs
      // For now, return null to signal "not implemented"
      return null;
    }
  },

  tmdb: {
    pattern: /https?:\/\/(www\.)?themoviedb\.org\/(movie|tv)\/(\d+)/i,
    async resolve(id) {
      return null; // not yet implemented
    }
  },

  tvdb: {
    pattern: /https?:\/\/(www\.)?thetvdb\.com\/(series\/\d+|.*[?&]id=\d+)/i,
    async resolve(id) {
      return null; // not yet implemented
    }
  },

  simkl: {
    pattern: /https?:\/\/(www\.)?simkl\.com\/(movie|tv)\/(\d+)/i,
    async resolve(id) {
      return null; // not yet implemented
    }
  }
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'loading' || !tab?.url) return;

  const { mdblredirEnabled, services } = await chrome.storage.local.get([
    'mdblredirEnabled',
    'services'
  ]);

  if (mdblredirEnabled === false) return;

  const activeServices = services || {};

  for (const [key, service] of Object.entries(SERVICES)) {
    if (activeServices[key] === false) continue;

    const match = tab.url.match(service.pattern);
    if (!match) continue;

    const id = match[match.length - 1]; // last capture group is usually the ID
    const cacheKey = `${key}:${id}`;

    let target = cache.get(cacheKey);
    if (!target) {
      target = await service.resolve(id);
      if (!target) continue; // service not ready or item not found
      cache.set(cacheKey, target);
    }

    chrome.tabs.update(tabId, { url: target });
    return; // only handle one service per navigation
  }
});
