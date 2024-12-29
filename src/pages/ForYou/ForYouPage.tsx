import { useEffect, useState } from 'react';
import { booksAPI } from '../../services/api';
import { Book } from '../../types';
import BookList from './components/BookList';
import RecommendedSection from './components/RecommendedSection';
import PopularSection from './components/PopularSection';

export default function ForYouPage() {
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await booksAPI.getBooks(1);
        setSuggestedBooks(response.data.results);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  const slicedBooks = suggestedBooks ? suggestedBooks.slice(0, 10) : [];

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="pb-20">
      <RecommendedSection />
      <PopularSection books={slicedBooks.slice(3, 7)} />
      <BookList title="Continue Reading" books={slicedBooks.slice(7, 10)} />
    </div>
  );
}