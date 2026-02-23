import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router";
import { filterVideos, selectDefaultVideo } from "../utils/mediaUtils";
import MediaPlayer from "../components/media/MediaPlayer";
import MediaSidebar from "../components/media/MediaSidebar";
import Loader from "../components/Loader";
import { useMediaVideos } from "../hooks/useMediaVideos";
import { MovieContext } from "../context/MovieContext";

export default function MediaPage() {
  const { id } = useParams();
  const { state } = useContext(MovieContext);
  const mediaType = state.user.mediaType;
  
  const { videos, loading } = useMediaVideos(mediaType, id);

  const [activeVideo, setActiveVideo] = useState(null);
  const [category, setCategory] = useState("All");

  const defaultVideo = useMemo(() => {
    return selectDefaultVideo(videos);
  }, [videos]);

  const currentVideo = activeVideo || defaultVideo;

  const filteredVideos = useMemo(() => {
    return filterVideos(videos, category);
  }, [videos, category]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-212 bg-bg dark:bg-bg-dark text-text dark:text-text-dark">
      <div className="flex-1">
        <MediaPlayer video={currentVideo} />
      </div>

      <div className="w-full lg:w-95">
        <MediaSidebar
          filteredVideos={filteredVideos}
          activeVideo={currentVideo}
          setActiveVideo={setActiveVideo}
          category={category}
          setCategory={setCategory}
        />
      </div>
    </div>
  );
}
