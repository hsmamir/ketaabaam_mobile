import { ArrowLeft, Search } from 'lucide-react';

export default function Header() {
  return (
    <div className="sticky top-0 bg-white z-10 px-4 py-3">
      <div className="flex items-center gap-4">
        <button className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-medium">Explore Books</h1>
      </div>
      <div className="mt-3 relative">
        <input
          type="text"
          placeholder="Search for books"
          className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}