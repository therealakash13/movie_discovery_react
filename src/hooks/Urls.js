const baseUrl = "https://api.themoviedb.org/3/movie";
const language = "en-US";

export const TMDB_POPULAR_URL = `${baseUrl}/popular?language=${language}`;
export const TMDB_TOP_RATED_URL = `${baseUrl}/top_rated?language=${language}`;
export const TMDB_UPCOMING_URL = `${baseUrl}/upcoming?language=${language}`;
export const TMDB_LATEST = `${baseUrl}/latest`;
