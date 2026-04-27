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

    const lowerQuery = query.toLowerCase();
    const exact = data.search.find(r => r.title.toLowerCase() === lowerQuery);
    if (exact) return exact.ids?.imdbid || null;

    return data.search[0].ids?.imdbid || null;
  } catch (_) {
    return null;
  }
}

function slugToTitle(slug) {
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
        const imdbId = await apiLookup('trakt', mediaType, id);
        if (imdbId) return `https://mdblist.com/${mediaType}/${imdbId}`;
        return null;
      }

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
    pattern: /https?:\/\/(www\.)?thetvdb\.com\/series\/([^/?]+)/i,
    async resolve(match) {
      const slugOrId = match[2];

      let tvdbId = null;

      if (/^\d+$/.test(slugOrId)) {
        // Old numeric path — verify it exists by trying the API directly
        tvdbId = slugOrId;
      } else {
        // New slug path — scrape the TVDB page for data-id
        try {
          const res = await fetch(`https://thetvdb.com/series/${slugOrId}`, { cache: 'no-store' });
          if (res.ok) {
            const html = await res.text();
            const idMatch = html.match(/data-id="(\d+)"/);
            if (idMatch) tvdbId = idMatch[1];
          }
        } catch (_) {}
      }

      if (!tvdbId) return null;
      const imdbId = await apiLookup('tvdb', 'show', tvdbId);
      if (imdbId) return `https://mdblist.com/show/${imdbId}`;
      return null;
    }
  },

  simkl: {
    pattern: /https?:\/\/(www\.)?simkl\.com\/(movies?|tv|shows)\/(\d+)/i,
    async resolve(match) {
      const simklType = match[2].startsWith('movie') ? 'movies' : 'tv';
      const id = match[3];

      try {
        const res = await fetch(`https://api.simkl.com/${simklType}/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        const data = await res.json();
        const imdbId = data.ids?.imdb;
        if (!imdbId) return null;

        const movieUrl = `https://mdblist.com/movie/${imdbId}`;
        const showUrl = `https://mdblist.com/show/${imdbId}`;

        try {
          const headRes = await fetch(movieUrl, { method: 'HEAD', redirect: 'follow', cache: 'no-store' });
          if (headRes.ok) return movieUrl;
        } catch (_) {}

        try {
          const headRes = await fetch(showUrl, { method: 'HEAD', redirect: 'follow', cache: 'no-store' });
          if (headRes.ok) return showUrl;
        } catch (_) {}

        return movieUrl;
      } catch (_) {
        return null;
      }
    }
  }
};

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.local.set({
      mdblredirEnabled: true,
      services: {
        imdb: true,
        simkl: true,
        trakt: false,
        tmdb: false,
        tvdb: false
      }
    });
  }
});

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
