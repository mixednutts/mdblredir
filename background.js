const cache = new Map();

async function getApiKey() {
  const result = await chrome.storage.local.get('mdblistApiKey');
  return result.mdblistApiKey || null;
}

async function apiLookup(provider, mediaType, id) {
  const apiKey = await getApiKey();
  if (!apiKey) return null;

  const url = `https://api.mdblist.com/${provider}/${mediaType}/${id}?apikey=${apiKey}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.ids?.imdb || null;
  } catch (_) {
    return null;
  }
}

async function apiSearch(mediaType, query) {
  const apiKey = await getApiKey();
  if (!apiKey) return null;

  const url = `https://api.mdblist.com/search/${mediaType}?query=${encodeURIComponent(query)}&limit=50&apikey=${apiKey}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.search || data.search.length === 0) return null;

    // Look for exact title match first
    const lowerQuery = query.toLowerCase();
    const exact = data.search.find(r => r.title.toLowerCase() === lowerQuery);
    if (exact) return exact.ids?.imdbid || null;

    // Fallback to first result
    return data.search[0].ids?.imdbid || null;
  } catch (_) {
    return null;
  }
}

function slugToTitle(slug) {
  // Remove trailing year like "-1999" if present
  const withoutYear = slug.replace(/-(19\d{2}|20\d{2})$/, '');
  return withoutYear.replace(/-/g, ' ');
}

const SERVICES = {
  imdb: {
    pattern: /https?:\/\/(www\.)?imdb\.com\/title\/(tt\d+)/i,
    async resolve(match) {
      const id = match[2];
      const movieUrl = `https://mdblist.com/movie/${id}`;
      const showUrl = `https://mdblist.com/show/${id}`;

      try {
        const res = await fetch(movieUrl, {
          method: 'HEAD',
          redirect: 'follow',
          cache: 'no-store'
        });
        if (res.ok) return movieUrl;
      } catch (_) {}

      try {
        const res = await fetch(showUrl, {
          method: 'HEAD',
          redirect: 'follow',
          cache: 'no-store'
        });
        if (res.ok) return showUrl;
      } catch (_) {}

      return movieUrl;
    }
  },

  trakt: {
    pattern: /https?:\/\/(www\.)?(app\.)?trakt\.tv\/(movies|shows)\/([^/?]+)/i,
    async resolve(match) {
      const mediaType = match[3] === 'movies' ? 'movie' : 'show';
      const id = match[4];

      if (/^\d+$/.test(id)) {
        // Numeric ID — use Trakt lookup directly
        const imdbId = await apiLookup('trakt', mediaType, id);
        if (imdbId) return `https://mdblist.com/${mediaType}/${imdbId}`;
        return null;
      }

      // Slug — convert to title and search MDBList
      const title = slugToTitle(id);
      const imdbId = await apiSearch(mediaType, title);
      if (imdbId) return `https://mdblist.com/${mediaType}/${imdbId}`;
      return null;
    }
  },

  tmdb: {
    pattern: /https?:\/\/(www\.)?themoviedb\.org\/(movie|tv)\/(\d+)/i,
    async resolve(match) {
      const mediaType = match[2] === 'movie' ? 'movie' : 'show';
      const id = match[3];
      const imdbId = await apiLookup('tmdb', mediaType, id);
      if (imdbId) return `https://mdblist.com/${mediaType}/${imdbId}`;
      return null;
    }
  },

  tvdb: {
    pattern: /https?:\/\/(www\.)?thetvdb\.com\/(series\/(\d+)|.*[?&]id=(\d+))/i,
    async resolve(match) {
      const id = match[3] || match[4];
      if (!id) return null;
      const imdbId = await apiLookup('tvdb', 'show', id);
      if (imdbId) return `https://mdblist.com/show/${imdbId}`;
      return null;
    }
  },

  simkl: {
    pattern: /https?:\/\/(www\.)?simkl\.com\/(movie|tv)\/(\d+)/i,
    async resolve(match) {
      const mediaType = match[2] === 'movie' ? 'movie' : 'show';
      const id = match[3];
      const imdbId = await apiLookup('simkl', mediaType, id);
      if (imdbId) return `https://mdblist.com/${mediaType}/${imdbId}`;
      return null;
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

    const cacheKey = `${key}:${match[0]}`;

    let target = cache.get(cacheKey);
    if (!target) {
      target = await service.resolve(match);
      if (!target) continue;
      cache.set(cacheKey, target);
    }

    chrome.tabs.update(tabId, { url: target });
    return;
  }
});
