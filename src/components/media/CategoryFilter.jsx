const categories = [
  "All",
  "Trailer",
  "Teaser",
  "Clip",
  "Behind the Scenes",
  "Featurette",
  "Bloopers",
];

export default function CategoryFilter({ category, setCategory }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-1 rounded text-sm transition font-semibold cursor-pointer text-text-dark dark:text-text-dark ${
            category === cat
              ? "bg-primary font-bold rounded-full"
              : "bg-secondary hover:bg-secondary/75"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
