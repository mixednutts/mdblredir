# MDBList Redirector

A Chrome extension that automatically redirects media database links to their equivalent [MDBLIST](https://mdblist.com) pages.

## Supported Platforms

| Platform | Status | Requires API Key | Example URL |
|----------|--------|------------------|-------------|
| IMDB | ✅ Working | No | `imdb.com/title/ttXXXXXX` |
| Trakt | 🧪 In testing | Yes | `trakt.tv/movies/fight-club-1999` |
| TMDB | 🧪 In testing | Yes | `themoviedb.org/movie/XXXX` |
| TVDB | 🧪 In testing | Yes | `thetvdb.com/series/XXXX` |
| SIMKL | 🧪 In testing | Yes | `simkl.com/movie/XXXX` |

## Setup

### IMDB Redirects
Works out of the box — no setup required.

### Trakt / TMDB / TVDB / SIMKL Redirects
These require a free MDBList API key:

1. Open the extension popup and click **"Set MDBList API key"**
2. Or go to `chrome://extensions/` → MDBList Redirector → **Details** → **Extension options**
3. Sign in to [mdblist.com/preferences](https://mdblist.com/preferences) and copy your API key
4. Paste it into the options page and click **Save**

The free tier includes **1,000 API requests per day**.

## Toggle Controls

Click the extension icon in Chrome's toolbar:

- **Master toggle** — enable/disable all redirects at once
- **Per-service toggles** — turn individual platforms on or off

Your preferences persist across browser restarts.

## How It Works

- **IMDB** — the extension probes MDBLIST's frontend redirects to detect whether a title is a movie or TV show, then redirects you accordingly.
- **Trakt** — slugs are converted to titles and searched via the MDBLIST API; numeric IDs are tried as TMDB lookups.
- **TMDB / TVDB / SIMKL** — the extension calls the MDBLIST API to resolve the external ID to an IMDB ID, then redirects to MDBLIST.

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** in the top-right corner
4. Click **Load unpacked** and select the `mdblredir` directory

## License

MIT
