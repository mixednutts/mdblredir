# Test URLs

A collection of real URLs used to verify redirects across all supported platforms.

---

## IMDB

### Movies
| Source URL | Expected MDBLIST Result | Status |
|------------|------------------------|--------|
| https://www.imdb.com/title/tt31728330/ | https://mdblist.com/movie/3gpq7-they-will-kill-you | ✅ |
| https://www.imdb.com/title/tt0137523/ | https://mdblist.com/movie/fight-club | ✅ |
| https://www.imdb.com/title/tt0468569/ | https://mdblist.com/movie/the-dark-knight | ✅ |

### TV Shows
| Source URL | Expected MDBLIST Result | Status |
|------------|------------------------|--------|
| https://www.imdb.com/title/tt0944947/ | https://mdblist.com/show/8pll-game-of-thrones | ✅ |
| https://www.imdb.com/title/tt0903747/ | https://mdblist.com/show/breaking-bad | ✅ |
| https://www.imdb.com/title/tt0185906/ | https://mdblist.com/show/band-of-brothers | ✅ |

---

## Trakt

### Movies (slug URLs)
| Source URL | Notes | Status |
|------------|-------|--------|
| https://trakt.tv/movies/fight-club-1999 | Slug → title search via API | 🧪 |
| https://trakt.tv/movies/the-dark-knight-2008 | Slug → title search via API | 🧪 |

### Movies (numeric URLs)
| Source URL | Notes | Status |
|------------|-------|--------|
| https://trakt.tv/movies/550 | Numeric ID tried as TMDB | 🧪 |

### TV Shows (slug URLs)
| Source URL | Notes | Status |
|------------|-------|--------|
| https://trakt.tv/shows/game-of-thrones | Slug → title search via API | 🧪 |
| https://trakt.tv/shows/breaking-bad | Slug → title search via API | 🧪 |

### TV Shows (numeric URLs)
| Source URL | Notes | Status |
|------------|-------|--------|
| https://trakt.tv/shows/1390 | Numeric ID tried as TMDB | 🧪 |

---

## TMDB

### Movies
| Source URL | Notes | Status |
|------------|-------|--------|
| https://www.themoviedb.org/movie/550 | Direct API lookup | 🧪 |
| https://www.themoviedb.org/movie/155 | Direct API lookup | 🧪 |

### TV Shows
| Source URL | Notes | Status |
|------------|-------|--------|
| https://www.themoviedb.org/tv/1399 | Direct API lookup | 🧪 |
| https://www.themoviedb.org/tv/2316 | Direct API lookup | 🧪 |

---

## TVDB

### TV Shows
| Source URL | Notes | Status |
|------------|-------|--------|
| https://thetvdb.com/series/121361 | Direct API lookup | 🧪 |
| https://thetvdb.com/series/73244 | Direct API lookup | 🧪 |

---

## SIMKL

### Movies
| Source URL | Notes | Status |
|------------|-------|--------|
| https://simkl.com/movie/1562 | Direct API lookup | 🧪 |

### TV Shows
| Source URL | Notes | Status |
|------------|-------|--------|
| https://simkl.com/tv/39633 | Direct API lookup | 🧪 |
