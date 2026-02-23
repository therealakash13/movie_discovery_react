import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  TOGGLE_MEDIA_TYPE,
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

    case TOGGLE_MEDIA_TYPE:
      return {
        ...state,
        user: {
          ...state.user,
          mediaType: action.payload,
        },
      };

    case FETCH_START: {
      const { key } = action;

      const existingCategory = state.media[key] || {
        totalPages: null,
        pages: {},
        allItems: [],
        loading: false,
      };

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

    case FETCH_SUCCESS: {
      const { key, payload } = action;

      // 🔥 DETAILS HANDLER

      if (payload.isDetails) {
        return {
          ...state,
          details: {
            ...state.details,
            [key]: payload.data,
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

      // ✅ Prevent refetching same page
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

      // ✅ Prevent duplicate items
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
