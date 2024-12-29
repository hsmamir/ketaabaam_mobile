import React, { useState } from 'react';
import { libraryAPI } from '../../../services/api';
import { LibraryBook } from '../../../types';

interface Props {
    onBookAdded: (newBook: LibraryBook) => void;
}

export default function AddBookModal({ onBookAdded }: Props) {
    const [bookId, setBookId] = useState<number>(0);
    const [category, setCategory] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsSubmitting(true);
        try {
            const response = await libraryAPI.createLibraryBook({ book: bookId, category });
            onBookAdded(response.data);
            setSuccess('Book added to your library.');
            setBookId(0);
            setCategory(1);
        } catch (err: any) {
            console.error('Error adding book:', err);
            setError('Failed to add book. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl mb-4">Add Book to Library</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                {success && <div className="text-green-500 mb-2">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-sm">Book ID</label>
                        <input
                            type="number"
                            value={bookId}
                            onChange={(e) => setBookId(Number(e.target.value))}
                            required
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter Book ID"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value={1}>Currently Reading</option>
                            <option value={2}>Want to Read</option>
                            <option value={3}>Finished</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add to Library'}
                    </button>
                </form>
            </div>
        </div>
    );
}