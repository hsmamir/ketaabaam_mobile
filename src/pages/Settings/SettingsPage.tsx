import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import SettingsItem from "./components/SettingsItem";
import { Bell, BookOpen, HelpCircle, LogOut, Shield, User } from "lucide-react";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="pb-20">
      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">تنظیمات</h2>

        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-2">حساب</h3>
            <div className="space-y-1">
              <SettingsItem
                icon={<User className="w-5 h-5" />}
                title="پروفایل"
                subtitle={user?.phone}
              />
              <SettingsItem
                icon={<Shield className="w-5 h-5" />}
                title="حریم خصوصی و امنیت"
              />
              <SettingsItem
                icon={<Bell className="w-5 h-5" />}
                title="اعلان ها"
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-2">مطالعه</h3>
            <div className="space-y-1">
              <SettingsItem
                icon={<BookOpen className="w-5 h-5" />}
                title="ترجیحات مطالعه"
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-gray-500 mb-2">پشتیبانی</h3>
            <div className="space-y-1">
              <SettingsItem
                icon={<HelpCircle className="w-5 h-5" />}
                title="پشتیبانی و راهنما"
              />
            </div>
          </section>

          <button
            onClick={handleLogout}
            className="flex gap-2 items-center space-x-3 w-full px-4 py-3 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>خروج</span>
          </button>
        </div>
      </div>
    </div>
  );
}
