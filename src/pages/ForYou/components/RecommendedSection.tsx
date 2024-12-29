import { Book } from '../../../types';
import { Star } from 'lucide-react';

interface Props {
  books: Book[];
}

export default function RecommendedSection({ books }: Props) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="flex gap-4 bg-white rounded-lg p-3 shadow-sm">
            <img
              src={book.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200'}
              alt={book.title}
              className="w-20 h-28 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author.name}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm ml-1">{book.average_rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}