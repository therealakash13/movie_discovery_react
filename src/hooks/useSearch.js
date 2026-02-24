import { useEffect, useState } from "react";
import { options, TMDB_SEARCH_MULTI } from "../utils/Urls";
import { normalizeMedia } from "../utils/normalizeMedia";

export function useSearch(query, page) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Reset when query changes
  useEffect(() => {
    setResults([]);
    setTotalPages(1);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function fetchSearch() {
      setLoading(true);

      try {
        const res = await fetch(TMDB_SEARCH_MULTI(query, page), {
          ...options,
          signal: controller.signal,
        });

        const data = await res.json();

        // 🔥 Normalize + keep mediaType
        const normalized = data.results.map((item) =>
          normalizeMedia(item, item.media_type),
        );

        setResults((prev) => {
          const merged = [...prev, ...normalized];

          // 🔥 Prevent movie/tv id collision
          const uniqueMap = new Map(
            merged.map((m) => [`${m.mediaType}_${m.id}`, m]),
          );

          return Array.from(uniqueMap.values());
        });

        setTotalPages(data.total_pages);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSearch();

    return () => controller.abort();
  }, [query, page]);

  return { results, loading, totalPages };
}
