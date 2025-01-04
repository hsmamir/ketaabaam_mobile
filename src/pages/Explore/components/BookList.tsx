import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../../types';

interface Props {
  title: string;
  books: Book[];
}

export default function BookList({ title, books }: Props) {
  const navigate = useNavigate();

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex gap-3 cursor-pointer"
            onClick={() => handleBookClick(book.id)}
          >
            <img
              src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
              alt={book.title}
              className="w-16 h-24 object-cover rounded"
            />
            <div>
              <h3 className="font-medium">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author?.name || 'نویسنده نامشخص'}</p>
              <p className="text-xs text-gray-500 mt-1">{book.genre?.name || 'موضوع نامشخص'}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}