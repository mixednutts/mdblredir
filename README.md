# mdblredir

A Chrome extension that automatically redirects media database links to their equivalent [MDBLIST](https://mdblist.com) pages.

## Supported Platforms

| Platform | Example URL | Redirects To |
|----------|-------------|--------------|
| IMDB | `imdb.com/title/ttXXXXXX` | `mdblist.com/movie/ttXXXXXX` or `mdblist.com/show/ttXXXXXX` |

> **Note:** TMDB, TVDB, and SIMKL redirects are planned but not yet supported because MDBLIST does not expose public frontend redirects for those IDs.

## How It Works

When you navigate to an IMDB title page, the extension's background service worker quickly probes MDBLIST to determine whether the title is a movie or a TV show, then redirects you to the correct MDBLIST page.

The lookup happens in milliseconds and is cached for the session so repeated visits to the same title are instant.

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** in the top-right corner
4. Click **Load unpacked** and select the `mdblredir` directory

## License

MIT
