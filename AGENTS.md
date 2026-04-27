# mdblredir — Agent Context

## Project Overview

**mdblredir** is a Chrome browser extension (Manifest V3) that transparently redirects
navigation requests from popular media databases to their equivalent pages on
[MDBLIST](https://mdblist.com).

## Architecture

- **Manifest V3** — modern Chrome extension format
- **Background service worker** — intercepts `tabs.onUpdated` events, probes MDBLIST via `fetch()`, and redirects the tab
- **No content scripts** — redirects happen via background script for flexibility
- **In-memory cache** — IMDB ID → MDBLIST URL mappings are cached per session to avoid repeated HEAD requests
- **Zero external dependencies** — vanilla JS

## File Layout

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest, permissions, host permissions |
| `background.js` | Service worker: detects IMDB navigations, probes MDBLIST movie/show paths, redirects tab |
| `rules.json` | Empty placeholder (reserved for future `declarativeNetRequest` rules) |
| `icons/` | Extension icons (16×16, 48×48, 128×128) |
| `README.md` | Human-facing documentation |
| `LICENSE` | MIT license |

## Supported Redirects

- **IMDB** → probes `mdblist.com/movie/<imdb_id>` then `mdblist.com/show/<imdb_id>`, redirects to whichever returns HTTP 301/200
- **Letterboxd** → scrapes `letterboxd.com/film/<slug>` for an IMDB ID, falls back to MDBList API title search
- **SIMKL** → disabled by default; calls SIMKL's public API which may IP-ban aggressive requests

## Adding a New Platform

1. Add the domain to `host_permissions` in `manifest.json`
2. Add URL detection logic to `background.js`
3. Implement probe/redirect logic (MDBLIST must expose a public frontend redirect for the platform)
4. Update `README.md` and this file
