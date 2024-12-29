import React, { useState } from 'react';
import { libraryAPI } from '../../../services/api';
import { LibraryBook } from '../../../types';

interface Props {
  book: LibraryBook;
  onUpdate: (updatedBook: LibraryBook) => void;
}

export default function BookProgress({ book, onUpdate }: Props) {
  const [progress, setProgress] = useState<number>(book.progress || 0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProgressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    setIsUpdating(true);
    setError(null);

    try {
      const response = await libraryAPI.updateLibraryBook(book.id, { progress: newProgress });
      onUpdate(response.data);
    } catch (err: any) {
      console.error('Error updating progress:', err);
      setError('Failed to update progress.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mt-2">
      <label className="text-sm">Progress: {progress}%</label>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="w-full"
      />
      {isUpdating && <p className="text-xs text-gray-500">Updating...</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}