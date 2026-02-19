export default function VideoItem({ video, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-2 rounded cursor-pointer transition ${
        isActive ? "bg-primary text-text-dark" : "hover:bg-secondary/30"
      }`}
    >
      <img
        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
        className="w-32 rounded"
      />

      <div className="flex flex-col gap-3 justify-between">
        <h4 className="text-sm font-semibold line-clamp-2">{video.name}</h4>

        <div className="flex items-center gap-2 text-xs font-semibold py-1">
          <span
            className={`px-2 py-0.5 rounded bg-secondary text-text-dark ${isActive ? "text-text-dark font-bold" : "text-secondary"}`}
          >
            {video.type}
          </span>

          {video.official && (
            <span
              className={`bg-primary text-text-dark px-2 py-0.5 rounded ${isActive && "bg-red-800"}`}
            >
              Official
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
