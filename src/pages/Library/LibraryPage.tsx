import { useEffect, useState } from 'react';
import { libraryAPI } from '../../services/api';
import { LibraryBook } from '../../types';
import LibraryTabs from './components/LibraryTabs';
import BookProgress from './components/BookProgress';

export default function LibraryPage() {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await libraryAPI.getLibrary();
        setBooks(response.data.results);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="pb-20">
      <LibraryTabs
        currentlyReading={books.filter(book => book.category === 1)}
        wantToRead={books.filter(book => book.category === 2)}
        finished={books.filter(book => book.category === 3)}
      />
    </div>
  );
}