import React, { useEffect, useState } from 'react';
import { libraryAPI } from '../../services/api';
import { LibraryBook } from '../../types';
import Loading from '../../components/Loading';

export default function LibraryPage() {
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibraryBooks = async () => {
      try {
        const response = await libraryAPI.getLibrary();
        setLibraryBooks(response.data.data || []);
      } catch (err: any) {
        setError('Failed to load library books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryBooks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">کتابخانه من</h2>
      {libraryBooks.length === 0 ? (
        <p>کتابی در کتابخانه شما یافت نشد.</p>
      ) : (
        <div className="space-y-4">
          {libraryBooks.map((book) => (
            <div key={book.id} className="flex gap-3">
              <img
                src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
                alt={book.book_title}
                className="w-16 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{book.book_title}</h3>
                <p className="text-sm text-gray-600">{book.author_name}</p>
                <p className="text-xs text-gray-500 mt-1">پیشرفت: {book.progress}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}