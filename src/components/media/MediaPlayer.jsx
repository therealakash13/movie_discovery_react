export default function MediaPlayer({ video }) {
  if (!video) {
    return (
      <div className="aspect-video rounded flex items-center justify-center">
        <h2 className="text-xl font-bold">No video available</h2>
      </div>
    );
  }

  return (
    <>
      <div className="aspect-video rounded overflow-hidden">
        {video.site === "YouTube" ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.key}`}
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold">
              Unsupported site: {video.site}
            </h2>
          </div>
        )}
      </div>

      <h2 className="mt-4 text-2xl font-bold">{video.name}</h2>

      <h2 className="text-xl  text-gray-400 mt-1 font-semibold">
        {video.type} • {video.site}
      </h2>
    </>
  );
}
