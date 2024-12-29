interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

export default function CategoryCard({ title, imageUrl }: CategoryCardProps) {
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex items-end p-4">
        <h3 className="text-white font-medium">{title}</h3>
      </div>
    </div>
  );
}