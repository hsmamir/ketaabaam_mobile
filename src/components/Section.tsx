interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="mt-6 px-4">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      {children}
    </div>
  );
}