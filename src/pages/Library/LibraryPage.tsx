import React, { useEffect, useState } from "react";
import { libraryAPI } from "../../services/api";
import { LibraryBook, PaginatedLibraryList } from "../../types";
import LibraryTabs from "./components/LibraryTabs";
import BookProgress from "./components/BookProgress";
import AddBookModal from "./components/AddBookModal"; // Optional: For adding books
import { useAuth } from "../../context/AuthContext";

export default function LibraryPage() {
  const { isAuthenticated } = useAuth();
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); // Adjust as needed
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!isAuthenticated) {
        setBooks([]);
        setLoading(false);
        return;
      }

      try {
        const response = await libraryAPI.getLibrary(
          currentPage,
          pageSize,
          searchTerm
        );
        const data: PaginatedLibraryList = response.data;
        console.log("Library API Response:", data); // Debugging
        setBooks(data.results || []);
      } catch (err: any) {
        console.error("Error fetching library:", err);
        setError("Failed to load your library. Please try again.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [isAuthenticated, currentPage, pageSize, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    // The useEffect will automatically refetch with updated searchTerm
  };

  const handleBookAdded = (newBook: LibraryBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setIsAddModalOpen(false);
  };

  if (loading) {
    return <div className="p-4">Loading your library...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <p>برای دیدن کتابات باید وارد بشی</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-semibold">کتابخونه من</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Book
        </button>
      </div>
      <form onSubmit={handleSearch} className="px-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search your library..."
          className="w-full px-3 py-2 border rounded"
        />
      </form>
      {error && <div className="text-red-500 px-4 mb-4">{error}</div>}
      <LibraryTabs
        currentlyReading={books.filter((book) => book.category === 1)}
        wantToRead={books.filter((book) => book.category === 2)}
        finished={books.filter((book) => book.category === 3)}
      />
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-gray-300 rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <span className="px-4 py-2">صفحه {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 ml-2 bg-gray-300 rounded"
        >
          بعدی
        </button>
      </div>
      {isAddModalOpen && <AddBookModal onBookAdded={handleBookAdded} />}
    </div>
  );
}
