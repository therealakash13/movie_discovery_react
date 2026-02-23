// utils/normalizeMedia.js

export function normalizeMedia(item, mediaType) {
  return {
    id: item.id,
    mediaType,

    // 🔥 Unified title
    title: item.title || item.name || "",

    // 🔥 Unified year
    year: (item.release_date || item.first_air_date || "").slice(0, 4),

    // 🔥 Unified images
    poster: item.poster_path,
    backdrop: item.backdrop_path,

    // 🔥 Unified rating
    rating: item.vote_average || 0,

    // 🔥 Overview
    overview: item.overview || "",

    // 🔥 Runtime normalization
    runtime:
      item.runtime ||
      (item.episode_run_time && item.episode_run_time[0]) ||
      null,

    // 🔥 Genres (if details endpoint)
    genres: item.genres || [],

    raw: item, // optional (keep original if needed)
  };
}
