import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-4xl font-bold mb-4">به کتابام خوش آمدید</h1>
            <p className="text-lg mb-4">اینجا می‌تونید کتاب‌های خودتون رو بخونید و کتاب‌های جدید رو کشف کنید.</p>
            <div className="flex space-x-4 gap-1">
                <Link to="/explore" className="text-blue-500">جستجوی کتاب</Link>
                <Link to="/library" className="text-blue-500">کتابخانه من</Link>
                <Link to="/settings" className="text-blue-500">تنظیمات</Link>
            </div>
        </div>
    );
}