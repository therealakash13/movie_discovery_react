export const defaultState = {
  movies: {
    trending: { totalPages: null, pages: {} },
    popular: { totalPages: null, pages: {} },
    topRated: { totalPages: null, pages: {} },
    upcoming: { totalPages: null, pages: {} },
    search: { totalPages: null, pages: {} },
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
