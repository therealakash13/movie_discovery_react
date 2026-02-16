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

    case FETCH_START: {
      const { category } = action;

      return {
        ...state,
        movies: {
          ...state.movies,
          [category]: {
            ...state.movies[category],
            loading: true,
          },
        },
      };
    }

    case FETCH_SUCCESS: {
      const { category, payload } = action;
      const { page, results, totalPages } = payload;

      const existingCategory = state.movies[category];

      if (existingCategory.pages[page]) {
        return {
          ...state,
          movies: {
            ...state.movies,
            [category]: {
              ...existingCategory,
              loading: false,
            },
          },
        };
      }

      const existingIds = new Set(existingCategory.allMovies.map((m) => m.id));

      const uniqueMovies = results.filter(
        (movie) => !existingIds.has(movie.id),
      );

      return {
        ...state,
        movies: {
          ...state.movies,
          [category]: {
            ...existingCategory,
            loading: false,
            totalPages,
            pages: {
              ...existingCategory.pages,
              [page]: true,
            },
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
