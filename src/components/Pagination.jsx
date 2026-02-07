export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-5 py-2 rounded text-sm font-semibold cursor-pointer
                   bg-zinc-200 dark:bg-secondary
                   disabled:opacity-40 disabled:cursor-not-allowed
                   hover:bg-zinc-300 dark:hover:bg-zinc-700"
      >
        Prev
      </button>

      {/* Page numbers */}
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const page = currentPage - 2 + i;

        if (page < 1 || page > totalPages) return null;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-5 py-2 rounded text-sm
              ${
                page === currentPage
                  ? "bg-primary text-white font-semibold"
                  : "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-5 py-2 rounded text-sm font-semibold cursor-pointer
                   bg-zinc-200 dark:bg-secondary
                   disabled:opacity-40 disabled:cursor-not-allowed
                   hover:bg-zinc-300 dark:hover:bg-zinc-700"
      >
        Next
      </button>
    </div>
  );
}
