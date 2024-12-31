import React, { useEffect, useState } from "react";
import { booksAPI } from "../../services/api";
import RecommendedSection from "./components/RecommendedSection";
import PopularSection from "./components/PopularSection";
import BookList from "../../components/BookList";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";
import { Book } from "../../types";

export default function ForYouPage() {
  const { isAuthenticated } = useAuth();
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (isAuthenticated) {
        try {
          const response = await booksAPI.getSuggestions();
          setSuggestedBooks(response.data || []);
        } catch (error) {
          console.error("Error fetching suggested books:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, [isAuthenticated]);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        {showRegister ? <RegisterForm /> : <LoginForm />}
        <button
          onClick={() => setShowRegister(!showRegister)}
          className="mt-2 text-blue-500"
        >
          {showRegister
            ? "حساب کاربری دارید؟ ورود"
            : "حساب کاربری ندارید؟ ثبت نام"}
        </button>
      </div>
    );
  }

  const slicedBooks = Array.isArray(suggestedBooks)
    ? suggestedBooks.slice(0, 10)
    : [];

  return (
    <div className="pb-20">
      <RecommendedSection />
      <PopularSection books={slicedBooks.slice(3, 7)} />
      <BookList title="ادامه مطالعه" books={slicedBooks.slice(7, 10)} />
    </div>
  );
}
