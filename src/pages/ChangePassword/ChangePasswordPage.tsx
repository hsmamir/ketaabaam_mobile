import React, { useState } from 'react';
import { authAPI } from '../../services/api';

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await authAPI.changePassword(currentPassword, newPassword, confirmPassword);
            setSuccess('رمز عبور با موفقیت تغییر یافت.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setError('رمز عبور فعلی اشتباه است.');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">تغییر رمز عبور</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {success && <div className="text-green-500 mb-2">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        رمز عبور فعلی
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        رمز عبور جدید
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        تایید رمز عبور جدید
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    تغییر رمز عبور
                </button>
            </form>
        </div>
    );
}