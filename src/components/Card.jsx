import { Link } from "react-router";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const { title, poster_path, vote_average, overview, release_date } = movie;

  return (
    <Link to={`/details/${movie.id}`}>
      <div
        className="group relative h-[98%] w-100 shrink-0 rounded-xl overflow-hidden 
                  bg-black transition-transform duration-300 ease-out hover:z-20 cursor-pointer"
      >
        {/* Poster */}
        <img
          src={
            poster_path ? `${IMAGE_BASE_URL}${poster_path}` : "/placeholder.jpg"
          }
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300
                   group-hover:scale-105
                   group-hover:opacity-40"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0
                   flex flex-col justify-end
                   p-4
                   opacity-0
                   group-hover:opacity-100
                   transition-opacity duration-300
                   text-white"
        >
          <h3 className="text-xl font-semibold line-clamp-1">{title}</h3>

          <div className="flex items-center gap-2 text-sm opacity-90">
            <span>⭐ {vote_average.toFixed(1)}</span>
            <span>•</span>
            <span>{release_date?.slice(0, 4)}</span>
          </div>

          <p className="text-lg mt-2 line-clamp-3 opacity-90">{overview}</p>
        </div>
      </div>
    </Link>
  );
}
