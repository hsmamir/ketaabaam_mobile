import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import SettingsItem from './components/SettingsItem';
import { Bell, BookOpen, HelpCircle, LogOut, Shield, User } from 'lucide-react';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="pb-20">
      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Account</h3>
            <div className="space-y-1">
              <SettingsItem
                icon={<User className="w-5 h-5" />}
                title="Profile"
                subtitle={user?.phone}
              />
              <SettingsItem
                icon={<Shield className="w-5 h-5" />}
                title="Privacy & Security"
              />
              <SettingsItem
                icon={<Bell className="w-5 h-5" />}
                title="Notifications"
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Reading</h3>
            <div className="space-y-1">
              <SettingsItem
                icon={<BookOpen className="w-5 h-5" />}
                title="Reading Preferences"
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Support</h3>
            <div className="space-y-1">
              <SettingsItem
                icon={<HelpCircle className="w-5 h-5" />}
                title="Help & Support"
              />
            </div>
          </section>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}