# mdblredir

A Chrome extension that automatically redirects media database links to their equivalent [MDBLIST](https://mdblist.com) pages.

## Supported Platforms

| Platform | Example URL | Redirects To |
|----------|-------------|--------------|
| IMDB | `imdb.com/title/ttXXXXXX` | `mdblist.com/title/ttXXXXXX` |
| TMDB | `themoviedb.org/movie/XXXX` | `mdblist.com/tmdb/XXXX` |
| TMDB | `themoviedb.org/tv/XXXX` | `mdblist.com/tmdb/XXXX` |
| TVDB | `thetvdb.com/series/XXXX` | `mdblist.com/tvdb/XXXX` |
| SIMKL | `simkl.com/movie/XXXX` | `mdblist.com/simkl/XXXX` |
| SIMKL | `simkl.com/tv/XXXX` | `mdblist.com/simkl/XXXX` |

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the `mdblredir` directory

## How It Works

The extension uses Chrome's `declarativeNetRequest` API to intercept navigation requests to supported media databases and redirect them to the corresponding MDBLIST page. All redirects happen locally — no data is sent to any external server.

## License

MIT
