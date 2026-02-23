import { useEffect, useState } from "react";
import { options, TMDB_SEARCH_MULTI } from "../utils/Urls";

export function useSuggestions(query) {
  const [suggestions, setSuggestions] = useState([]);

  const normalizedQuery = query.trim();

  useEffect(() => {
    if (!normalizedQuery) return;

    const controller = new AbortController();

    async function fetchSuggestions() {
      try {
        const res = await fetch(TMDB_SEARCH_MULTI(normalizedQuery), {
          ...options,
          signal: controller.signal,
        });

        const data = await res.json();
        setSuggestions(data.results.slice(0, 6));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    }

    fetchSuggestions();

    return () => controller.abort();
  }, [normalizedQuery]);

  return normalizedQuery ? suggestions : [];
}
