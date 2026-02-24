import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { FETCH_START, FETCH_SUCCESS, FETCH_ERROR } from "../context/action";
import { BASE_URL, LANGUAGE, options } from "../utils/Urls";
import { normalizeMedia } from "../utils/normalizeMedia";

export function useMediaDetails({ mediaType, id }) {
  const { state, dispatch } = useContext(MovieContext);

  const key = `${mediaType}_${id}`;  

  const detailsState = state.details[key];
  const existingData = detailsState?.data;

  useEffect(() => {
    if (!mediaType || !id) return;

    // ✅ Only skip if actual data exists
    if (existingData) return;

    async function fetchDetails() {
      dispatch({ type: FETCH_START, key, isDetails: true });

      try {
        const url = `${BASE_URL}/${mediaType}/${id}?language=${LANGUAGE}`;
        const res = await fetch(url, options);
        const data = await res.json();
        

        const normalized = normalizeMedia(data, mediaType);

        dispatch({
          type: FETCH_SUCCESS,
          key,
          payload: {
            isDetails: true,
            data: normalized,
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

    fetchDetails();
  }, [mediaType, id, existingData]);

  return {
    media: existingData || null,
    loading: detailsState?.loading ?? true,
  };
}
