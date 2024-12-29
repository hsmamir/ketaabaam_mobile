import React from "react";
import { Book } from "../../types";

interface Props {
  title: string;
  books: Book[];
}

export default function BookList({ title, books }: Props) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {books.length === 0 ? (
        <p>کتابی پیدا نشد!</p>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex gap-3 bg-white rounded-lg p-4 shadow"
            >
              <img
                src={
                  book.cover ||
                  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200"
                }
                alt={book.title}
                className="w-16 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{book.title}</h3>
                <p className="text-sm text-gray-600">
                  {book.author.name || "نویسنده نامشخص"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {book.genre.name || "موضوع نامشخص"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
