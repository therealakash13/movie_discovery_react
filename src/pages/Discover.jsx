import Loader from "../components/Loader";
import DiscoverBanner from "../components/DiscoverBanner";
import { useMedia } from "../hooks/useMedia";
import { useParams } from "react-router";

export default function Discover() {
  const { mediaType } = useParams();

  const { media, loading } = useMedia({
    mediaType,
    category: "discover",
    page: 1,
  });

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col justify-between py-6 w-full">
      <h2 className="dark:text-text-dark text-text text-3xl font-semibold mb-4">
        Discover {mediaType === "movie" ? "Movies" : "TV Shows"}
      </h2>

      <div className="rounded overflow-hidden">
        {media.length > 0 && <DiscoverBanner movies={media} />}
      </div>
    </div>
  );
}
