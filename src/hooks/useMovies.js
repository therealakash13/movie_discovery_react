import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";

// const CACHE_TTL = 1000 * 60 * 10; // 10 min

const options = {
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
      if (categoryState?.pages?.[page]) {
        return;
      }

      dispatch({ type: "FETCH_START" });

      try {
        const res = await fetch(`${baseUrl}&page=${page}`, options);
        const data = await res.json();

        dispatch({
          type: "SET_MOVIE_LIST",
          payload: {
            category,
            page,
            data: data.results,
            totalPages: data.total_pages,
          },
        });
      } catch (err) {
        dispatch({
          type: "FETCH_ERROR",
          payload: err.message,
        });
      }
    }

    fetchMovies();
  }, [category, baseUrl, page]);

  return {
    movies: categoryState?.pages?.[page] || [],
    totalPages: categoryState?.totalPages || 0,
    loading: state.ui.loading,
    error: state.ui.error,
  };
}
