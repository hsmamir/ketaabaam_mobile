import { LibraryBook } from '../../../types';

interface Props {
  book: LibraryBook;
  showProgress?: boolean;
}

export default function BookProgress({ book, showProgress = true }: Props) {
  return (
    <div className="flex gap-4">
      <img
        src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
        alt={book.book_title}
        className="w-20 h-28 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium">{book.book_title}</h3>
        <p className="text-sm text-gray-600">{book.author_name}</p>
        {showProgress && (
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${book.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {book.pages_read} pages read ({Math.round(book.progress)}%)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}