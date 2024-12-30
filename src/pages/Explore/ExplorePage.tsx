import React, { useState, useCallback } from "react";
import { booksAPI } from "../../services/api";
import { Book } from "../../types";
import BookList from "../../components/BookList";
import Loading from "../../components/Loading";
import LoadMore from "../../components/LoadMore";
import { Search } from "lucide-react";

export default function ExplorePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const fetchBooks = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await booksAPI.getBooks(page, 10, searchTerm);
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
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err: any) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setBooks([]);
    setHasSearched(true);
    fetchBooks(1);
  };

  const loadMoreBooks = useCallback(() => {
    if (!loading && hasSearched) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchBooks(nextPage);
    }
  }, [loading, hasSearched, currentPage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSearch}
        className={`w-full max-w-md ${hasSearched ? "mt-4" : "mt-0"}`}
      >
        <div className="relative">
          <button type="submit" className="absolute left-2 top-2">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="کتاب، نویسنده، ناشر، موضوع..."
            className="w-full pl-10 pr-4 py-2 border rounded"
          />
        </div>
      </form>
      {loading && <Loading />}
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {hasSearched && !loading && !error && (
        <div className="w-full mt-4">
          <BookList title="نتایج جستجو" books={books} />
          <LoadMore onLoadMore={loadMoreBooks} />
        </div>
      )}
    </div>
  );
}
