# MDBList Redirector

A Chrome extension that automatically redirects media database links to their equivalent [MDBLIST](https://mdblist.com) pages.

## Supported Platforms

| Platform | Status | Example URL |
|----------|--------|-------------|
| IMDB | ✅ Working | `imdb.com/title/ttXXXXXX` |
| Trakt | 🧪 In testing | `trakt.tv/movies/XXXX` |
| TMDB | 🔜 Planned | `themoviedb.org/movie/XXXX` |
| TVDB | 🔜 Planned | `thetvdb.com/series/XXXX` |
| SIMKL | 🔜 Planned | `simkl.com/movie/XXXX` |

## Toggle Controls

Click the extension icon in Chrome's toolbar to open the popup:

- **Master toggle** — enable/disable all redirects at once
- **Per-service toggles** — turn individual platforms on or off

Your preferences are saved to Chrome's local storage and persist across browser restarts.

## How It Works

When you navigate to a supported title page and that service is enabled, the extension's background service worker probes MDBLIST to determine the correct redirect URL, then sends you there. Results are cached for the session so repeated visits are instant.

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** in the top-right corner
4. Click **Load unpacked** and select the `mdblredir` directory

## License

MIT
