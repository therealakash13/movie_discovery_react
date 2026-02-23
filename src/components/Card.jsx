import { Link } from "react-router";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const { id, mediaType, title, poster, rating, overview, year } = movie;

  return (
    <Link to={`/${mediaType}/details/${id}`}>
      <div
        className="group relative h-[98%] w-100 shrink-0 rounded-xl overflow-hidden 
                  bg-black transition-transform duration-300 ease-out hover:z-20 cursor-pointer"
      > 
        {/* Poster */}
        <img
          src={
            poster ? `${IMAGE_BASE_URL}${poster}` : "/placeholder.jpg"
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
            <span>⭐ {rating}</span>
            <span>•</span>
            <span>{year}</span>
          </div>

          <p className="text-lg mt-2 line-clamp-3 opacity-90">{overview}</p>
        </div>
      </div>
    </Link>
  );
}
