import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import { FETCH_START, FETCH_SUCCESS } from "../context/action";

// const CACHE_TTL = 1000 * 60 * 10; // 10 min

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTgzYWNlOTUzYTE3ZTE0MDEyYjJmMzk3ZTk5OTk0OSIsIm5iZiI6MTcxODI2OTY0OS40MzEsInN1YiI6IjY2NmFiNmQxNDgzN2NlYmFhZWE3NTAyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sgTgJ5BwuDCF75KgXJqiBapsAgrXdK8tGGnLUA-YhAI",
  },
};

// function isCacheValid(timestamp) {
//   return timestamp && Date.now() - timestamp < CACHE_TTL;
// }

export function useMovies(category, baseUrl, page = 1) {
  const { state, dispatch } = useContext(MovieContext);
  const categoryState = state.movies[category];

  useEffect(() => {
    async function fetchMovies() {
      dispatch({ type: FETCH_START, category });

      try {
        const res = await fetch(`${baseUrl}&page=${page}`, options);
        const data = await res.json();

        dispatch({
          type: FETCH_SUCCESS,
          category,
          payload: {
            page,
            results: data.results,
            totalPages: data.total_pages,
          },
        });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", category, payload: err.message });
      }
    }

    fetchMovies();
  }, [baseUrl, page, category]);

  return {
    movies: categoryState?.allMovies || [],
    loading: categoryState?.loading || false,
    totalPages: categoryState?.totalPages || 1,
  };
}
