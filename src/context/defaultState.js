export const createCategoryState = () => ({
  totalPages: null,
  pages: {},
  allItems: [],
  loading: false,
});

export const defaultState = {
  media: {
    // dynamically filled like:
    // movie_popular
    // tv_popular
    // movie_topRated
  },

  details: {
    // movie_123
    // tv_456
  },

  ui: {
    error: null,
  },

  user: {
    watchList: [],
    theme: "dark",
    mediaType: "movie",
  },
};
