import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { booksAPI, libraryAPI } from "../../services/api";
import { Book } from "../../types";
import Loading from "../../components/Loading";
import { Star, Heart } from "lucide-react";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [addingToLibrary, setAddingToLibrary] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);

  const fetchLikeStatus = async () => {
    try {
      const response = await booksAPI.getBookLikeStatus(Number(id));
      setLiked(response.data.liked);
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

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

  const checkIfInLibrary = async () => {
    try {
      const response = await libraryAPI.getLibrary();
      const isInLibrary = response.data.results.some(
        (libraryBook: any) => libraryBook.book.id === Number(id)
      );
      setInLibrary(isInLibrary);
    } catch (error) {
      console.error("Error checking library status:", error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
    fetchLikeStatus();
    checkIfInLibrary();
  }, [id]);

  const handleLike = async () => {
    try {
      await booksAPI.likeBook(Number(id));
      setLiked(!liked);
      fetchBookDetails();
    } catch (error) {
      console.error("Error liking the book:", error);
    }
  };

  const handleAddToLibrary = async () => {
    setAddingToLibrary(true);
    try {
      await libraryAPI.addToLibrary(Number(id));
      setInLibrary(true);
    } catch (error) {
      console.error("Error adding book to library:", error);
    } finally {
      setAddingToLibrary(false);
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
          className={`w-4 h-4 ${i < rating ? "text-yellow-500" : "text-gray-300"
            }`}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="p-4 max-w-3xl mx-auto">
        <img
          src={
            book.cover ||
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200"
          }
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="p-6">
          <div className="flex items-center justify-between mt-4">
            <h5 className="text-xl font-semibold mb-2 flex items-center">
              {book.title}
            </h5>
            <span className="text-xl font-semibold mb-2 flex items-center">
              {renderStars(Math.round(book.average_rating))}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{book.about}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-sm text-gray-600">شابک: {book.isbn}</p>
            <p className="text-sm text-gray-600">
              تاریخ انتشار: {book.published}
            </p>
            <p className="text-sm text-gray-600">تعداد صفحات: {book.pages}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Heart
                className={`w-6 h-6 cursor-pointer ${liked ? "text-red-500" : "text-gray-300"
                  }`}
                onClick={handleLike}
              />{" "}
              {book.likes_count}
            </p>
          </div>
          <div className="flex flex-row gap-4 mb-4">
            <Link to={`/authors/${book.author.id}`} className="text-blue-500">
              نویسنده: {book.author.name}
            </Link>
            <Link
              to={`/publishers/${book.publisher.id}`}
              className="text-blue-500"
            >
              ناشر: {book.publisher.name}
            </Link>
          </div>
          <button
            onClick={handleAddToLibrary}
            disabled={inLibrary || addingToLibrary}
            className={`px-4 py-2 text-white ${inLibrary ? "bg-gray-400" : "bg-blue-500"} rounded`}
          >
            {addingToLibrary ? "در حال افزودن..." : inLibrary ? "در کتابخانه شماست" : "افزودن به کتابخانه"}
          </button>
        </div>
      </div>
    </div>
  );
}
