import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../../types";
import { booksAPI } from "../../../services/api";
import Loading from "../../../components/Loading";

export default function RecommendedSection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchSuggestions = useCallback(async () => {
    try {
      const response = await booksAPI.getSuggestions();
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching suggested books:", error);
      setError("Failed to load suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">پیشنهاد برا تو</h2>
      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex gap-4 bg-white rounded-lg p-3 shadow-sm cursor-pointer"
            onClick={() => handleBookClick(book.id)}
          >
            <img
              src={
                book.cover ||
                "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200"
              }
              alt={book.title}
              className="w-20 h-28 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author_name}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm ml-1">{book.likes_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
