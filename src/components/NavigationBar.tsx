import { NavLink } from "react-router-dom";
import { Home, Search, BookMarked, Settings } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

function NavItem({ icon, label, to }: NavItemProps) {
  return (
    <NavLink to={to} className="flex flex-col items-center gap-1">
      {({ isActive }) => (
        <>
          <div className={isActive ? "text-blue-600" : "text-gray-500"}>
            {icon}
          </div>
          <span
            className={`text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default function NavigationBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center py-2 px-4">
        <NavItem icon={<Home size={24} />} to="/" />
        <NavItem icon={<Search size={24} />} to="/explore" />
        <NavItem icon={<BookMarked size={24} />} to="/library" />
        <NavItem icon={<Settings size={24} />} to="/settings" />
      </div>
    </div>
  );
}
