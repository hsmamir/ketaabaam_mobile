import { Book } from '../../../types';
import { Heart } from 'lucide-react';

interface Props {
  books: Book[];
}

export default function PopularSection({ books }: Props) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">پرطرفدارا</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {books.map((book) => (
          <div key={book.id} className="flex-shrink-0 w-32">
            <img
              src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg"
            />
            <h3 className="mt-2 font-medium text-sm line-clamp-2">{book.title}</h3>
            <div className="flex items-center mt-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-xs ml-1">{book.likes_count}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}