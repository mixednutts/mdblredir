# mdblredir — Agent Context

## Project Overview

**mdblredir** is a Chrome browser extension (Manifest V3) that transparently redirects
navigation requests from popular media databases to their equivalent pages on
[MDBLIST](https://mdblist.com).

## Architecture

- **Manifest V3** — modern Chrome extension format
- **declarativeNetRequest** — declarative redirect rules (no persistent background page)
- **No content scripts** — redirects happen at the network layer for efficiency
- **Zero external dependencies** — pure JSON + manifest

## File Layout

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest, permissions, host permissions, ruleset declaration |
| `rules.json` | `declarativeNetRequest` rules defining URL pattern redirects |
| `icons/` | Extension icons (16×16, 48×48, 128×128) |
| `README.md` | Human-facing documentation |
| `LICENSE` | MIT license |

## Supported Redirects

- **IMDB** → `mdblist.com/title/<imdb_id>`
- **TMDB (movie/tv)** → `mdblist.com/tmdb/<tmdb_id>`
- **TVDB** → `mdblist.com/tvdb/<tvdb_id>`
- **SIMKL (movie/tv)** → `mdblist.com/simkl/<simkl_id>`

## Coding Conventions

- Keep `rules.json` sorted by `id`
- Use `regexFilter` for flexible URL matching
- Only target `main_frame` requests (full page navigations)
- Add new host permissions to `manifest.json` whenever new domains are added

## Adding a New Platform

1. Add the domain to `host_permissions` in `manifest.json`
2. Append a new rule object to `rules.json` with a unique `id`
3. Test the regex thoroughly against real URLs
4. Update `README.md` and this file
