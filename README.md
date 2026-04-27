# MDBList Redirector

![MDBList Redirector](mdblredir.png?raw=true)

A Chrome extension that automatically redirects media database links to their equivalent [MDBLIST](https://mdblist.com) pages.

## Supported Platforms

| Platform | Status | Requires API Key | Example URL |
|----------|--------|------------------|-------------|
| IMDB | ✅ Working | No | `imdb.com/title/ttXXXXXX` |
| SIMKL | ⚠️ Disabled by default | No | `simkl.com/movies/XXXX` |
| Letterboxd | ✅ Working | No | `letterboxd.com/film/XXXX` |
| Trakt | ✅ Working | Yes | `trakt.tv/movies/fight-club-1999` |
| TMDB | ✅ Working | Yes | `themoviedb.org/movie/XXXX` |
| TVDB | ✅ Working | Yes | `thetvdb.com/series/XXXX` |

## Setup

### IMDB & Letterboxd Redirects
Work out of the box — no setup required.

> **Note:** SIMKL is disabled by default due to IP-banning issues. SIMKL's API may block or rate-limit requests, causing redirects to fail. You can re-enable it in the extension popup if needed, but be aware that repeated requests may result in a temporary ban.

### Trakt / TMDB / TVDB Redirects
These require a free MDBList API key:

1. Open the extension popup and click **"Get MDBList API Key"**
2. Sign in to [mdblist.com](https://mdblist.com/signin/) — if you're not logged in you'll be redirected to sign in automatically
3. Copy your API key from the Preferences page and paste it into the extension popup
4. Click **Save**

The free tier includes **1,000 API requests per day**.

## Toggle Controls

Click the extension icon in Chrome's toolbar:

- **Master toggle** — enable/disable all redirects at once
- **Per-service toggles** — turn individual platforms on or off
- **API key field** — enter or update your key directly in the popup

Trakt, TMDB, and TVDB show 🔒 until a valid API key is saved.
Letterboxd works without an API key (page scraping), but the API key enables a title-search fallback.

## How It Works

- **IMDB** — the extension probes MDBList's frontend redirects to detect whether a title is a movie or TV show, then redirects you accordingly.
- **SIMKL** — the extension calls SIMKL's public API to retrieve the IMDB ID, then redirects to MDBList. Disabled by default due to SIMKL IP-banning aggressive requests.
- **Letterboxd** — the extension scrapes the Letterboxd page for the IMDB ID; if not found, it falls back to searching by title via the MDBList API.
- **Trakt** — numeric IDs are looked up via the MDBList API; slugs are converted to titles and searched.
- **TMDB / TVDB** — the extension calls the MDBList API to resolve the external ID to an IMDB ID, then redirects to MDBList.

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** in the top-right corner
4. Click **Load unpacked** and select the `mdblistredir` directory

## License

MIT
