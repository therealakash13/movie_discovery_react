import { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";

const CACHE_TTL = 1000 * 60 * 10; // 10 min

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTgzYWNlOTUzYTE3ZTE0MDEyYjJmMzk3ZTk5OTk0OSIsIm5iZiI6MTcxODI2OTY0OS40MzEsInN1YiI6IjY2NmFiNmQxNDgzN2NlYmFhZWE3NTAyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sgTgJ5BwuDCF75KgXJqiBapsAgrXdK8tGGnLUA-YhAI",
  },
};

function isCacheValid(timestamp) {
  return timestamp && Date.now() - timestamp < CACHE_TTL;
}

export function useMovies(category, endpoint) {
  const { state, dispatch } = useContext(MovieContext);
  const { movies, cache, ui } = state;

  useEffect(() => {
    async function fetchMovies() {
      if (movies[category]?.length && isCacheValid(cache[category])) return;

      dispatch({ type: "FETCH_START" });

      try {
        const res = await fetch(endpoint, options);
        const data = await res.json();
        console.log(data);        

        dispatch({
          type: "SET_MOVIE_LIST",
          payload: {
            category,
            data: data.results,
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
  }, [category, endpoint]);

  return {
    movies: movies[category],
    loading: ui.loading,
    error: ui.error,
  };
}
