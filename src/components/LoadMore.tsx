import React, { useEffect, useRef } from 'react';

interface LoadMoreProps {
  onLoadMore: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onLoadMore }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [onLoadMore]);

  return <div ref={loadMoreRef} className="h-10" />;
};

export default LoadMore;