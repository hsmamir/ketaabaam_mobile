import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(phone, password);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl mb-4">ورود</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-2">
        <label className="block text-sm">شماره موبایل</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your phone number"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">رمز عبور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        ورود
      </button>
    </form>
  );
}