export const defaultState = {
  movies: {
    popular: { totalPages: null, pages: {}, allMovies: [], loading: false },
    trending: { totalPages: null, pages: {}, allMovies: [], loading: false },
    topRated: { totalPages: null, pages: {}, allMovies: [], loading: false },
    upcoming: { totalPages: null, pages: {}, allMovies: [], loading: false },
    search: { totalPages: null, pages: {}, allMovies: [], loading: false },
    discover: { totalPages: null, pages: {}, allMovies: [], loading: false },
    details: null,
  },

  ui: {
    error: null, // keep only global error here
  },

  user: {
    watchList: [],
    theme: "dark",
  },
};
