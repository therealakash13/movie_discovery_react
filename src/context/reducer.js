import {
  FETCH_ERROR,
  FETCH_START,
  SET_MOVIE_LIST,
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
        ui: { loading: true, error: null },
      };

    case SET_MOVIE_LIST: {
      const { category, data } = action.payload;

      return {
        ...state,
        ui: { loading: false, error: null },
        movies: {
          ...state.movies,
          [category]: data,
        },
        cache: {
          ...state.cache,
          [category]: Date.now(),
        },
      };
    }

    case FETCH_ERROR:
      return {
        ...state,
        ui: { loading: false, error: action.payload },
      };

    default:
      return state;
  }
}
