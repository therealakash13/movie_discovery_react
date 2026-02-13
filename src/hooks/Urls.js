const baseUrl = "https://api.themoviedb.org/3/movie";
const language = "en-US";

export const TMDB_POPULAR_URL = `${baseUrl}/popular?language=${language}`;
export const TMDB_TOP_RATED_URL = `${baseUrl}/top_rated?language=${language}`;
export const TMDB_UPCOMING_URL = `${baseUrl}/upcoming?language=${language}`;
export const TMDB_DETAILS_URL = (id) => `${baseUrl}/${id}?language=${language}`
export const TMDB_DISCOVER = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
