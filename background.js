const cache = new Map();

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'loading' || !tab?.url) return;

  const imdbMatch = tab.url.match(/https?:\/\/(www\.)?imdb\.com\/title\/(tt\d+)/i);
  if (!imdbMatch) return;

  const imdbId = imdbMatch[2];

  if (cache.has(imdbId)) {
    chrome.tabs.update(tabId, { url: cache.get(imdbId) });
    return;
  }

  const movieUrl = `https://mdblist.com/movie/${imdbId}`;
  const showUrl = `https://mdblist.com/show/${imdbId}`;

  try {
    const movieRes = await fetch(movieUrl, {
      method: 'HEAD',
      redirect: 'manual',
      cache: 'no-store'
    });
    if (movieRes.status === 301 || movieRes.ok) {
      cache.set(imdbId, movieUrl);
      chrome.tabs.update(tabId, { url: movieUrl });
      return;
    }
  } catch (_) {
    // fall through
  }

  try {
    const showRes = await fetch(showUrl, {
      method: 'HEAD',
      redirect: 'manual',
      cache: 'no-store'
    });
    if (showRes.status === 301 || showRes.ok) {
      cache.set(imdbId, showUrl);
      chrome.tabs.update(tabId, { url: showUrl });
      return;
    }
  } catch (_) {
    // fall through
  }

  // Not found on MDBLIST — redirect to movie path so user sees MDBLIST 404
  cache.set(imdbId, movieUrl);
  chrome.tabs.update(tabId, { url: movieUrl });
});
