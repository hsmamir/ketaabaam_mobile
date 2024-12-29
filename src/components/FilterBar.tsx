export default function FilterBar() {
  const filters = ['All Genres', 'All Authors', 'All Publishers', 'All Formats'];
  
  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter}
          className="px-4 py-1.5 bg-gray-100 rounded-full text-sm whitespace-nowrap"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}