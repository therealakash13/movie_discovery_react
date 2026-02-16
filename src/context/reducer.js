import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  TOGGLE_THEME,
} from "./action";

export function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_THEME: {
      return {
        ...state,
        user: {
          ...state.user,
          theme: state.user.theme === "dark" ? "light" : "dark",
        },
      };
    }

    case FETCH_START:
      return {
        ...state,
        ui: { ...state.ui, loading: true, error: null },
      };

    case FETCH_SUCCESS: {
      const { category, payload } = action;
      const { page, results, totalPages } = payload;

      const existingCategory = state.movies[category] || {
        pages: {},
        allMovies: [],
        totalPages: 1,
      };

      if (existingCategory.pages[page]) {
        return {
          ...state,
          ui: {
            ...state.ui,
            loading: false,
          },
        };
      }

      const existingIds = new Set(existingCategory.allMovies.map((m) => m.id));

      const uniqueMovies = results.filter(
        (movie) => !existingIds.has(movie.id),
      );

      return {
        ...state,
        ui: { ...state.ui, loading: false, error: null },
        movies: {
          ...state.movies,
          [category]: {
            pages: {
              ...existingCategory.pages,
              [page]: true,
            },
            totalPages,
            allMovies: [...existingCategory.allMovies, ...uniqueMovies],
          },
        },
      };
    }

    case FETCH_ERROR:
      return {
        ...state,
        ui: { ...state.ui, loading: false, error: action.payload },
      };

    default:
      return state;
  }
}
