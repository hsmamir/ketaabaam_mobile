import React from "react";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="p-4">
            <RegisterForm />
            <p className="mt-2">
                حساب کاربری دارید؟ <a href="/login" className="text-blue-500">ورود</a>
            </p>
        </div>
    );
}