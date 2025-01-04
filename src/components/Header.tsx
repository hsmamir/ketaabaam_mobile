import { ArrowRight, Search } from 'lucide-react';

export default function Header() {
  return (
    <div className="sticky top-0 bg-white z-10 px-4 py-3">
      <div className="flex items-center gap-4">
        <button className="p-1">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}