import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { libraryAPI } from '../../services/api';
import { LibraryBook, CategoryEnum } from '../../types';
import Loading from '../../components/Loading';

export default function LibraryBookPage() {
    const { id } = useParams<{ id: string }>();
    const [libraryBook, setLibraryBook] = useState<LibraryBook | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryEnum | null>(null);

    useEffect(() => {
        const fetchLibraryBook = async () => {
            try {
                const response = await libraryAPI.getLibraryBook(Number(id));
                setLibraryBook(response.data);
                setSelectedCategory(response.data.category);
            } catch (err: any) {
                setError('Failed to load library book. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryBook();
    }, [id]);

    const handleCategoryChange = async (newCategory: CategoryEnum) => {
        setSelectedCategory(newCategory);

        try {
            await libraryAPI.updateLibraryBook(Number(id), { category: newCategory });
        } catch (err: any) {
            setError('Failed to update category. Please try again.');
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    if (!libraryBook) {
        return <div className="p-4">کتابی یافت نشد.</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">{libraryBook.book_title}</h2>
            <img
                src={libraryBook.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
                alt={libraryBook.book_title}
                className="w-32 h-48 object-cover rounded mb-4"
            />
            <p className="text-sm text-gray-600">{libraryBook.author_name}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${libraryBook.progress}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1 rounded">پیشرفت: {libraryBook.progress}%</p>
            <div className="mt-4 flex ">
                <button
                    onClick={() => handleCategoryChange(CategoryEnum.CurrentlyReading)}
                    className={`flex-grow px-4 py-2 rounded-r ${selectedCategory === CategoryEnum.CurrentlyReading ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    در حال خواندن
                </button>
                <button
                    onClick={() => handleCategoryChange(CategoryEnum.WantToRead)}
                    className={`flex-grow px-4 py-2 ${selectedCategory === CategoryEnum.WantToRead ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    می‌خواهم بخوانم
                </button>
                <button
                    onClick={() => handleCategoryChange(CategoryEnum.Finished)}
                    className={`flex-grow px-4 py-2 rounded-l ${selectedCategory === CategoryEnum.Finished ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    خوانده شده
                </button>
            </div>
        </div>
    );
}