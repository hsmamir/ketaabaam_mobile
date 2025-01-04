import React from "react";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
    return (
        <div className="p-4">
            <LoginForm />
            <p className="mt-2">
                حساب کاربری ندارید؟ <a href="/register" className="text-blue-500">ثبت نام</a>
            </p>
        </div>
    );
}