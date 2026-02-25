import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  TOGGLE_MEDIA_TYPE,
  TOGGLE_THEME,
} from "./action";
import { createCategoryState } from "./defaultState";

export function reducer(state, action) {
  switch (action.type) {
    // ===============================
    // USER ACTIONS
    // ===============================

    case TOGGLE_THEME:
      return {
        ...state,
        user: {
          ...state.user,
          theme: state.user.theme === "dark" ? "light" : "dark",
        },
      };

    case TOGGLE_MEDIA_TYPE:
      return {
        ...state,
        user: {
          ...state.user,
          mediaType: state.user.mediaType === "movie" ? "tv" : "movie",
        },
      };

    // ===============================
    // FETCH START
    // ===============================

    case FETCH_START: {
      const { key, isDetails } = action;

      // If this key exists in details, it's a details fetch
      if (isDetails) {
        return {
          ...state,
          details: {
            ...state.details,
            [key]: {
              data: null,
              loading: true,
            },
          },
        };
      }

      // Otherwise treat as list/media
      const existingCategory = state.media[key] || createCategoryState();

      return {
        ...state,
        media: {
          ...state.media,
          [key]: {
            ...existingCategory,
            loading: true,
          },
        },
      };
    }

    // ===============================
    // FETCH SUCCESS
    // ===============================

    case FETCH_SUCCESS: {
      const { key, payload } = action;

      // 🔥 DETAILS HANDLER
      if (payload.isDetails) {
        return {
          ...state,
          details: {
            ...state.details,
            [key]: {
              data: payload.data,
              loading: false,
            },
          },
        };
      }

      // 🔥 LIST HANDLER
      const { page, results, totalPages } = payload;

      const existingCategory = state.media[key] || {
        totalPages: null,
        pages: {},
        allItems: [],
        loading: false,
      };

      // Prevent refetching same page
      if (existingCategory.pages[page]) {
        return {
          ...state,
          media: {
            ...state.media,
            [key]: {
              ...existingCategory,
              loading: false,
            },
          },
        };
      }

      // Prevent duplicate items
      const existingIds = new Set(
        existingCategory.allItems.map((item) => item.id),
      );

      const uniqueItems = results.filter((item) => !existingIds.has(item.id));

      return {
        ...state,
        media: {
          ...state.media,
          [key]: {
            ...existingCategory,
            loading: false,
            totalPages,
            pages: {
              ...existingCategory.pages,
              [page]: true,
            },
            allItems: [...existingCategory.allItems, ...uniqueItems],
          },
        },
      };
    }

    // ===============================
    // FETCH ERROR
    // ===============================

    case FETCH_ERROR:
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload,
        },
      };

    default:
      return state;
  }
}
