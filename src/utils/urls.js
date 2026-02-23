export const BASE_URL = "https://api.themoviedb.org/3";
export const LANGUAGE = "en-US";

export const MEDIA_TYPES = {
  MOVIE: "movie",
  TV: "tv",
};

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTgzYWNlOTUzYTE3ZTE0MDEyYjJmMzk3ZTk5OTk0OSIsIm5iZiI6MTcxODI2OTY0OS40MzEsInN1YiI6IjY2NmFiNmQxNDgzN2NlYmFhZWE3NTAyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sgTgJ5BwuDCF75KgXJqiBapsAgrXdK8tGGnLUA-YhAI",
  },
};

// Generic category list URLs
export const TMDB_LIST_URL = (mediaType, category) =>
  `${BASE_URL}/${mediaType}/${category}?language=${LANGUAGE}`;

// Details
export const TMDB_DETAILS_URL = (mediaType, id) =>
  `${BASE_URL}/${mediaType}/${id}?language=${LANGUAGE}`;

// Videos
export const TMDB_VIDEO_URL = (mediaType, id) =>
  `${BASE_URL}/${mediaType}/${id}/videos?language=${LANGUAGE}`;

// Discover
export const TMDB_DISCOVER = (mediaType, page = 1) =>
  `${BASE_URL}/discover/${mediaType}?include_adult=false&language=${LANGUAGE}&page=${page}&sort_by=popularity.desc`;

// Search
export const TMDB_SEARCH = (mediaType, query, page = 1) =>
  `${BASE_URL}/search/${mediaType}?query=${query}&page=${page}&language=${LANGUAGE}`;

// Multi search
export const TMDB_SEARCH_MULTI = (query, page = 1) =>
  `${BASE_URL}/search/multi?query=${query}&page=${page}&language=${LANGUAGE}`;
