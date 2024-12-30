import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { booksAPI } from "../../services/api";
import { Book } from "../../types";
import Loading from "../../components/Loading";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await booksAPI.getBookDetails(Number(id));
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="p-4">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-semibold mt-4">{book.title}</h1>
      <p className="text-sm text-gray-600 mt-2">{book.about}</p>
      <p className="text-sm text-gray-600 mt-2">ISBN: {book.isbn}</p>
      <p className="text-sm text-gray-600 mt-2">Published: {book.published}</p>
      <p className="text-sm text-gray-600 mt-2">Pages: {book.pages}</p>
      <p className="text-sm text-gray-600 mt-2">
        Rating: {book.average_rating}
      </p>
      <p className="text-sm text-gray-600 mt-2">Likes: {book.likes_count}</p>
      <Link
        to={`/authors/${book.author.id}`}
        className="text-blue-500 mt-2 block"
      >
        {book.author.name}
      </Link>
      <Link
        to={`/publishers/${book.publisher.id}`}
        className="text-blue-500 mt-2 block"
      >
        {book.publisher.name}
      </Link>
    </div>
  );
}
