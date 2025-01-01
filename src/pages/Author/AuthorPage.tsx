import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authorsAPI } from "../../services/api";
import { Author, Book } from "../../types";
import Loading from "../../components/Loading";
import { Heart } from "lucide-react";

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await authorsAPI.getAuthorDetails(Number(id));
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching author details:", error);
        setError("Failed to load author details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAuthorBooks = async () => {
      try {
        const response = await authorsAPI.getAuthorBooks(Number(id));
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setBooks(response.data.data);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching author books:", error);
        setError("Failed to load author books. Please try again.");
      }
    };

    fetchAuthorDetails();
    fetchAuthorBooks();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!author) {
    return <div className="p-4">Author not found</div>;
  }

  return (
    <div className="p-4">
      <img
        src={author.image}
        alt={author.name}
        className="w-full h-full object-cover rounded-lg"
      />
      <h1 className="text-2xl font-semibold mt-4">{author.name}</h1>
      <p className="text-sm text-gray-600 mt-2">{author.bio}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className="text-sm text-gray-600">تاریخ تولد: {author.birthdate}</p>
        <p className="text-sm text-gray-600">ایمیل: {author.email}</p>
      </div>
      <h2 className="text-xl font-semibold mb-4">کتاب‌های {author.name}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex-shrink-0 w-32 cursor-pointer"
            onClick={() => navigate(`/books/${book.id}`)}
          >
            <img
              src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg"
            />
            <h3 className="mt-2 font-medium text-sm line-clamp-2">{book.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{book.about}</p>
            <p className="text-xs text-gray-600 mt-1">{book.author_name}</p>
            <p className="text-xs text-gray-600 mt-1">{book.publisher_name}</p>
            <div className="flex items-center mt-1 gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-xs ml-1">{book.likes_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
