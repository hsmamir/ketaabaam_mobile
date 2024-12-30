import React from "react";
import { Book } from "../../types";
import BookCard from "./BookCard";

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
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author.name}
              imageUrl={book.cover || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
