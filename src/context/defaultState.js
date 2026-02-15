export const defaultState = {
  movies: {
    popular: { totalPages: null, pages: {}, allMovies: [] },
    trending: { totalPages: null, pages: {}, allMovies: [] },
    topRated: { totalPages: null, pages: {}, allMovies: [] },
    upcoming: { totalPages: null, pages: {}, allMovies: [] },
    search: { totalPages: null, pages: {}, allMovies: [] },
    discover: { totalPages: null, pages: {}, allMovies: [] },
    details: null,
  },

  cache: {
    trending: {},
    popular: {},
    topRated: {},
    upcoming: {},
    search: {},
  },

  ui: {
    loading: false,
    error: null,
  },

  user: {
    watchList: [],
    theme: "dark",
  },
};
