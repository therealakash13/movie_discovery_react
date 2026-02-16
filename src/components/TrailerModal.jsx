import { useEffect } from "react";

export default function TrailerModal({ isOpen, onClose, trailerKey }) {
  // Close on ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Disable body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-[90%] md:w-225 aspect-video bg-black rounded overflow-hidden shadow-2xl z-10 scale-100 transition-transform duration-300">
        {trailerKey ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white text-xl">
            Trailer not available
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 bg-secondary hover:bg-secondary/40 text-white px-3 py-1 rounded transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// https://img.youtube.com/vi/hiD3zk0ZRFg/hqdefault.jpg - yt thumbnail