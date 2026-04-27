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

1. Open the extension popup and click **"Get MDBList API Key"**
2. Sign in to [mdblist.com](https://mdblist.com/preferences/) — if you're not logged in you'll be redirected to sign in automatically
3. Copy your API key from the Preferences page and paste it into the extension popup
4. Click **Save**

The free tier includes **1,000 API requests per day**.

## Toggle Controls

Click the extension icon in Chrome's toolbar:

- **Master toggle** — enable/disable all redirects at once
- **Per-service toggles** — turn individual platforms on or off
- **API key field** — enter or update your key directly in the popup

Non-IMDB services show 🔒 until a valid API key is saved.

## How It Works

- **IMDB** — the extension probes MDBList's frontend redirects to detect whether a title is a movie or TV show, then redirects you accordingly.
- **Trakt** — numeric IDs are looked up via the MDBList API; slugs are converted to titles and searched.
- **TMDB / TVDB / SIMKL** — the extension calls the MDBList API to resolve the external ID to an IMDB ID, then redirects to MDBList.

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** in the top-right corner
4. Click **Load unpacked** and select the `mdblistredir` directory

## License

MIT
