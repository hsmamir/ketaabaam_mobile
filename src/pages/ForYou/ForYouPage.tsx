import React, { useEffect, useState } from 'react';
import { booksAPI } from '../../services/api';
import RecommendedSection from './components/RecommendedSection';
import PopularSection from './components/PopularSection';
import BookList from './components/BookList';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import { useAuth } from '../../context/AuthContext';

export default function ForYouPage() {
  const { isAuthenticated } = useAuth();
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (isAuthenticated) {
        try {
          const response = await booksAPI.getSuggestions();
          setSuggestedBooks(response.data || []);
        } catch (error) {
          console.error('Error fetching suggested books:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, [isAuthenticated]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        {showRegister ? <RegisterForm /> : <LoginForm />}
        <button
          onClick={() => setShowRegister(!showRegister)}
          className="mt-2 text-blue-500"
        >
          {showRegister ? 'Already have an account? Login' : 'No account? Register'}
        </button>
      </div>
    );
  }

  const slicedBooks = Array.isArray(suggestedBooks) ? suggestedBooks.slice(0, 10) : [];

  return (
    <div className="pb-20">
      <RecommendedSection />
      <PopularSection books={slicedBooks.slice(3, 7)} />
      <BookList title="Continue Reading" books={slicedBooks.slice(7, 10)} />
    </div>
  );
}