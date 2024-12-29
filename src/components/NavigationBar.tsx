import { Home, Search, BookMarked, Settings } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function NavItem({ icon, label, isActive }: NavItemProps) {
  return (
    <button className="flex flex-col items-center gap-1">
      <div className={isActive ? "text-blue-600" : "text-gray-500"}>
        {icon}
      </div>
      <span className={`text-xs ${isActive ? "text-blue-600" : "text-gray-500"}`}>
        {label}
      </span>
    </button>
  );
}

export default function NavigationBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center py-2 px-4">
        <NavItem icon={<Home size={24} />} label="For You" />
        <NavItem icon={<Search size={24} />} label="Explore" isActive={true} />
        <NavItem icon={<BookMarked size={24} />} label="My Library" />
        <NavItem icon={<Settings size={24} />} label="Settings" />
      </div>
    </div>
  );
}