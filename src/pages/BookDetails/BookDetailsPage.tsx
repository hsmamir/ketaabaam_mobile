import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { booksAPI } from "../../services/api";
import { Book } from "../../types";
import Loading from "../../components/Loading";
import { Star, Heart } from "lucide-react";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

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

    const fetchLikeStatus = async () => {
      try {
        const response = await booksAPI.getBookLikeStatus(Number(id));
        setLiked(response.data.liked); // Assuming the API returns a 'liked' field
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchBookDetails();
    fetchLikeStatus();
  }, [id]);

  const handleLike = async () => {
    try {
      await booksAPI.likeBook(Number(id));
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking the book:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!book) {
    return <div>کتاب پیدا نشد</div>;
  }

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="p-4 max-w-3xl mx-auto">
        <img
          src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="p-6">
          <h5 className="text-xl font-semibold mb-2 flex items-center">
            {book.title}
            <span className="ml-2 flex items-center">
              {renderStars(Math.round(book.average_rating))}
            </span>
          </h5>
          <p className="text-gray-600 mb-4">{book.about}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-sm text-gray-600">شابک: {book.isbn}</p>
            <p className="text-sm text-gray-600">تاریخ انتشار: {book.published}</p>
            <p className="text-sm text-gray-600">تعداد صفحات: {book.pages}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1"><Heart className={`w-6 h-6 cursor-pointer ${liked ? "text-red-500" : "text-white"}`}
              onClick={handleLike} /> {book.likes_count}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {book.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-row gap-4">
            <Link
              to={`/authors/${book.author.id}`}
              className="text-blue-500"
            >
              نویسنده: {book.author.name}
            </Link>
            <Link
              to={`/publishers/${book.publisher.id}`}
              className="text-blue-500"
            >
              ناشر: {book.publisher.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
