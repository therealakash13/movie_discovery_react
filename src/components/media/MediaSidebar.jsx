import CategoryFilter from "./CategoryFilter";
import VideoList from "./VideoList";

export default function MediaSidebar({
  filteredVideos,
  activeVideo,
  setActiveVideo,
  category,
  setCategory,
}) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <CategoryFilter category={category} setCategory={setCategory} />

      <VideoList
        videos={filteredVideos}
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />
    </div>
  );
}
