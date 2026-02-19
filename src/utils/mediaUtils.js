export function selectDefaultVideo(videos) {
  if (!videos?.length) return null;

  return (
    videos.find((v) => v.type === "Trailer" && v.official) ||
    videos.find((v) => v.type === "Trailer") ||
    videos[0]
  );
}

export function getUniqueSites(videos) {
  return [...new Set(videos.map((v) => v.site))];
}

export function filterVideos(videos, category) {
  return videos.filter((video) => {
    return category === "All" || video.type === category;
  });
}
