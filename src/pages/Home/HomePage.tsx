import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavigationBar from "../../components/NavigationBar";

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-4xl font-bold mb-4">به کتابام خوش آمدید</h1>
            <p className="text-lg mb-4">اینجا می‌تونید کتاب‌های خودتون رو بخونید و کتاب‌های جدید رو کشف کنید.</p>
            {isAuthenticated ? (
                <>
                    <p className="text-lg mb-4">خوش آمدید!</p>
                    <NavigationBar />
                </>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <Link to="/login" className="text-blue-500">ورود</Link>
                    <Link to="/register" className="text-blue-500">ثبت نام</Link>
                </div>
            )}
        </div>
    );
}