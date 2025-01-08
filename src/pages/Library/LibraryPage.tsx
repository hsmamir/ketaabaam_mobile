import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { libraryAPI } from '../../services/api';
import { LibraryBook } from '../../types';
import Loading from '../../components/Loading';

export default function LibraryPage() {
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (searchTerm && searchPerformed && filteredBooks.length === 0) {
      const fetchLibraryBooks = async () => {
        try {
          const response = await libraryAPI.getLibrary(undefined, undefined, searchTerm);
          setLibraryBooks(response.data.data || []);
        } catch (err: any) {
          setError('Failed to load library books. Please try again.');
        }
      };

      fetchLibraryBooks();
    }
  }, [searchTerm, searchPerformed]);

  const filteredBooks = libraryBooks.filter(book =>
    book.book_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">کتابخانه من</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSearchPerformed(true);
        }}
        placeholder="جستجو در کتابخانه"
        className="w-full px-3 py-2 mb-4 border rounded"
      />
      {filteredBooks.length === 0 ? (
        <p>کتابی در کتابخانه شما یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="flex gap-3 cursor-pointer"
              onClick={() => navigate(`/library/book/${book.id}`)}
            >
              <img
                src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
                alt={book.book_title}
                className="w-16 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{book.book_title}</h3>
                <p className="text-sm text-gray-600">{book.author_name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${book.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">پیشرفت: {book.progress}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}