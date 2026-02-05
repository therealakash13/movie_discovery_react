export const defaultState = {
  movies: {
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
    search: [],
    details: null,
  },

  cache: {
    trending: null,
    popular: null,
    topRated: null,
    upcoming: null,
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
