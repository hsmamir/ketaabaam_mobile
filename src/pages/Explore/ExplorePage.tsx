import React, { useState, useEffect } from 'react';
import { booksAPI } from '../../services/api';
import { Book } from '../../types';
import BookList from '../../components/BookList';

export default function ExplorePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await booksAPI.getBooks(currentPage, 10, searchTerm);
        const data = response.data;
        if (Array.isArray(data.data)) {
          const mappedBooks = data.data.map((book: any) => ({
            id: book.id,
            title: book.title,
            cover: book.cover,
            about: book.about,
            author: { name: book.author_name },
            genre: { name: book.publisher_name },
            likes_count: book.likes_count,
          }));
          setBooks((prevBooks) => [...prevBooks, ...mappedBooks]);
          setHasMore(currentPage < data.num_of_pages);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (err: any) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setBooks([]);
    setCurrentPage(1);
    setHasMore(true);
  };

  const loadMoreBooks = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Explore Books</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books..."
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <BookList title="Search Results" books={books} />
      {loading && <div className="text-center mt-4">Loading...</div>}
      {hasMore && !loading && (
        <div className="text-center mt-4">
          <button onClick={loadMoreBooks} className="px-4 py-2 bg-gray-300 rounded">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}