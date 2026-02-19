import VideoItem from "./VideoItem";

export default function VideoList({ videos, activeVideo, setActiveVideo }) {
  return (
    <div className="card flex-1 overflow-y-auto space-y-2 pr-2">
      {videos.length === 0 ? (
        <p className="text-center font-semibold">No videos available in this category.</p>
      ) : (
        videos.map((video) => (
          <VideoItem
            key={video.id}
            video={video}
            isActive={activeVideo?.id === video.id}
            onClick={() => setActiveVideo(video)}
          />
        ))
      )}
    </div>
  );
}
