import React from 'react';
import { LibraryBook } from '../../types';

interface Props {
    title: string;
    books: LibraryBook[];
}

export default function BookList({ title, books }: Props) {
    return (
        <section className="px-4 py-6">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {books.length === 0 ? (
                <p>No books in this category.</p>
            ) : (
                <div className="space-y-4">
                    {books.map((libraryBook) => {
                        const book = libraryBook.book;
                        return (
                            <div key={libraryBook.id} className="flex gap-3 bg-white rounded-lg p-4 shadow">
                                <img
                                    src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
                                    alt={book.title}
                                    className="w-16 h-24 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium">{book.title}</h3>
                                    <p className="text-sm text-gray-600">{book.author?.name || 'Unknown Author'}</p>
                                    <p className="text-xs text-gray-500 mt-1">{book.genre?.name || 'Unknown Genre'}</p>
                                    <BookProgress book={libraryBook} onUpdate={(updatedBook) => {
                                        // Handle book update if needed
                                    }} />
                                </div>
                                {/* Optional: Add buttons for removing book from library */}
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}