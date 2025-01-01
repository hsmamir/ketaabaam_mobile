import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { publishersAPI } from "../../services/api";
import { Publisher, Book } from "../../types";
import Loading from "../../components/Loading";
import { Heart } from "lucide-react";

export default function PublisherPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublisherDetails = async () => {
      try {
        const response = await publishersAPI.getPublisherDetails(Number(id));
        setPublisher(response.data);
      } catch (error) {
        console.error("Error fetching publisher details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPublisherBooks = async () => {
      try {
        const response = await publishersAPI.getPublisherBooks(Number(id));
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

    fetchPublisherDetails();
    fetchPublisherBooks();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!publisher) {
    return <div>Publisher not found</div>;
  }

  return (
    <div className="p-4">
      <img
        src={publisher.image}
        alt={publisher.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-semibold mt-4">{publisher.name}</h1>
      <p className="text-gray-600">{publisher.about}</p>
      <p className="text-gray-600">نشانی: {publisher.address}</p>
      <a
        href={publisher.website}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline">وبسایت: {publisher.website}</a>
      <h2 className="text-xl font-semibold mb-4">کتاب‌های {publisher.name}</h2>
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
