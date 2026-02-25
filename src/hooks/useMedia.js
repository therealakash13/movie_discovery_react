import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { FETCH_START, FETCH_SUCCESS, FETCH_ERROR } from "../context/action";
import { BASE_URL, LANGUAGE, options, TMDB_LIST_URL } from "../utils/Urls";
import { normalizeMedia } from "../utils/normalizeMedia";

export function useMedia({ mediaType, category, page = 1 }) {
  const { state, dispatch } = useContext(MovieContext);

  // 🔥 Unique key per media type + category
  const key = `${mediaType}_${category}`;

  const categoryState = state.media[key];

  useEffect(() => {
    async function fetchMedia() {
      // ✅ Prevent refetching same page
      if (categoryState?.pages?.[page]) return;

      dispatch({ type: FETCH_START, key });

      try {
        const url = TMDB_LIST_URL(mediaType,category,page);
        const res = await fetch(url, options);
        const data = await res.json();

        const normalizedResults = data.results.map((item) =>
          normalizeMedia(item, mediaType),
        );

        dispatch({
          type: FETCH_SUCCESS,
          key,
          payload: {
            page,
            results: normalizedResults,
            totalPages: data.total_pages,
          },
        });
      } catch (err) {
        dispatch({
          type: FETCH_ERROR,
          key,
          payload: err.message,
        });
      }
    }

    fetchMedia();
  }, [mediaType, category, page]);

  return {
    media: categoryState?.allItems || [],
    loading: categoryState?.loading || false,
    totalPages: categoryState?.totalPages || 1,
  };
}
