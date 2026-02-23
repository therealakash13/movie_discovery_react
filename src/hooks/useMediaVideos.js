import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { FETCH_START, FETCH_SUCCESS, FETCH_ERROR } from "../context/action";
import { BASE_URL, LANGUAGE, options } from "../utils/Urls";


export function useMediaVideos({ mediaType, id }) {
  const { state, dispatch } = useContext(MovieContext);

  const key = `videos_${mediaType}_${id}`;
  const existingVideos = state.media[key];

  useEffect(() => {
    if (!id) return;

    // ✅ Already cached
    if (existingVideos?.allItems?.length) return;

    async function fetchVideos() {
      dispatch({ type: FETCH_START, key });

      try {
        const url = `${BASE_URL}/${mediaType}/${id}/videos?language=${LANGUAGE}`;
        const res = await fetch(url, options  );
        const data = await res.json();

        dispatch({
          type: FETCH_SUCCESS,
          key,
          payload: {
            page: 1,
            results: data.results,
            totalPages: 1,
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

    fetchVideos();
  }, [mediaType, id]);

  return {
    videos: existingVideos?.allItems || [],
    loading: existingVideos?.loading || false,
  };
}
