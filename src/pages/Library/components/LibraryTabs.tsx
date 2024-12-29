import { useState } from 'react';
import { LibraryBook } from '../../../types';
import BookProgress from './BookProgress';

interface Props {
  currentlyReading: LibraryBook[];
  wantToRead: LibraryBook[];
  finished: LibraryBook[];
}

export default function LibraryTabs({ currentlyReading, wantToRead, finished }: Props) {
  const [activeTab, setActiveTab] = useState('reading');

  return (
    <div>
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'reading' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('reading')}
        >
          Reading ({currentlyReading.length})
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'want' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('want')}
        >
          Want to Read ({wantToRead.length})
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'finished' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('finished')}
        >
          Finished ({finished.length})
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'reading' && (
          <div className="space-y-4">
            {currentlyReading.map((book) => (
              <BookProgress key={book.id} book={book} />
            ))}
          </div>
        )}
        {activeTab === 'want' && (
          <div className="space-y-4">
            {wantToRead.map((book) => (
              <BookProgress key={book.id} book={book} showProgress={false} />
            ))}
          </div>
        )}
        {activeTab === 'finished' && (
          <div className="space-y-4">
            {finished.map((book) => (
              <BookProgress key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}