import { ChevronLeft } from 'lucide-react';

interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

export default function SettingsItem({ icon, title, subtitle, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-50 rounded-lg"
    >
      <div className="text-gray-500">{icon}</div>
      <div className="flex-1 text-right ml-3">
        <div className="font-medium">{title}</div>
        {subtitle && <div className="text-sm text-gray-500 ">{subtitle}</div>}
      </div>
      <ChevronLeft className="w-5 h-5 text-gray-400" />
    </button>
  );
}