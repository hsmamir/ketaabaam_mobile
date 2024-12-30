import { Link } from 'react-router-dom';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  size?: 'normal' | 'large';
}

export default function BookCard({ id, title, author, imageUrl, size = 'normal' }: BookCardProps) {
  return (
    <Link to={`/books/${id}`} className={`flex flex-col ${size === 'large' ? 'w-48' : 'w-32'}`}>
      <img
        src={imageUrl}
        alt={title}
        className={`w-full rounded-lg object-cover ${
          size === 'large' ? 'h-64' : 'h-44'
        }`}
      />
      <h3 className="mt-2 font-medium line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-600">{author}</p>
    </Link>
  );
}