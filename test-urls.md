# Test URLs

A collection of real URLs used to verify redirects across all supported platforms.

---

## IMDB

### Movies
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://www.imdb.com/title/tt31728330/ | https://mdblist.com/movie/3gpq7-they-will-kill-you | They Will Kill You | ✅ |
| https://www.imdb.com/title/tt0137523/ | https://mdblist.com/movie/fight-club | Fight Club | ✅ |
| https://www.imdb.com/title/tt0468569/ | https://mdblist.com/movie/the-dark-knight | The Dark Knight | ✅ |

### TV Shows
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://www.imdb.com/title/tt0944947/ | https://mdblist.com/show/8pll-game-of-thrones | Game of Thrones | ✅ |
| https://www.imdb.com/title/tt0903747/ | https://mdblist.com/show/breaking-bad | Breaking Bad | ✅ |
| https://www.imdb.com/title/tt0185906/ | https://mdblist.com/show/band-of-brothers | Band of Brothers | ✅ |

---

## Trakt

### Movies (slug URLs)
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://trakt.tv/movies/fight-club-1999 | https://mdblist.com/movie/tt0137523 | Fight Club | 🧪 |
| https://trakt.tv/movies/the-dark-knight-2008 | https://mdblist.com/movie/tt0468569 | The Dark Knight | 🧪 |

### Movies (numeric URLs)
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://trakt.tv/movies/550 | https://mdblist.com/movie/tt0213149 | Pearl Harbor | 🧪 |

### TV Shows (slug URLs)
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://trakt.tv/shows/game-of-thrones | https://mdblist.com/show/tt0944947 | Game of Thrones | 🧪 |
| https://trakt.tv/shows/breaking-bad | https://mdblist.com/show/tt0903747 | Breaking Bad | 🧪 |

### TV Shows (numeric URLs)
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://trakt.tv/shows/1390 | https://mdblist.com/show/tt0944947 | Game of Thrones | 🧪 |

---

## TMDB

### Movies
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://www.themoviedb.org/movie/550 | https://mdblist.com/movie/tt0137523 | Fight Club | 🧪 |
| https://www.themoviedb.org/movie/155 | https://mdblist.com/movie/tt0468569 | The Dark Knight | 🧪 |

### TV Shows
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://www.themoviedb.org/tv/1399 | https://mdblist.com/show/tt0944947 | Game of Thrones | 🧪 |
| https://www.themoviedb.org/tv/2316 | https://mdblist.com/show/tt0411008 | Lost | 🧪 |

---

## TVDB

TVDB now uses slug URLs (`/series/{slug}`). The extension scrapes the page for the numeric ID.

### TV Shows
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://thetvdb.com/series/game-of-thrones | https://mdblist.com/show/tt0944947 | Game of Thrones | 🧪 |
| https://thetvdb.com/series/lost | https://mdblist.com/show/tt0411008 | Lost | 🧪 |

---

## SIMKL

### Movies
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://simkl.com/movie/53894 | https://mdblist.com/movie/tt0137523 | Fight Club | 🧪 |

### TV Shows
| Source URL | Expected MDBLIST Result | Title | Status |
|------------|------------------------|-------|--------|
| https://simkl.com/tv/17465 | https://mdblist.com/show/tt0944947 | Game of Thrones | 🧪 |
