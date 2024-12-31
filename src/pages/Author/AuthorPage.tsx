import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { authorsAPI } from "../../services/api";
import { Author } from "../../types";
import Loading from "../../components/Loading";

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('AuthorPage');
  console.log('id:', id);

  const fetchAuthorDetails = useCallback(async () => {
    try {
      const response = await authorsAPI.getAuthorDetails(Number(id));
      setAuthor(response.data);
    } catch (error) {
      console.error("Error fetching author details:", error);
      setError("Failed to load author details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAuthorDetails();
    }
  }, [fetchAuthorDetails, id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!author) {
    return <div className="p-4">Author not found</div>;
  }

  return (
    <div className="p-4">
      <img
        src={author.image}
        alt={author.name}
        className="w-full h-full object-cover rounded-lg"
      />
      <h1 className="text-2xl font-semibold mt-4">{author.name}</h1>
      <p className="text-sm text-gray-600 mt-2">{author.bio}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className="text-sm text-gray-600">تاریخ تولد: {author.birthdate}</p>
        <p className="text-sm text-gray-600">ایمیل: {author.email}</p>
      </div>
    </div>
    
  );
}
