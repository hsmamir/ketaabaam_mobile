import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authorsAPI } from "../../services/api";
import { Author } from "../../types";
import Loading from "../../components/Loading";

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await authorsAPI.getAuthorDetails(Number(id));
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching author details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!author) {
    return <div>Author not found</div>;
  }

  return (
    <div className="p-4">
      <img
        src={author.image}
        alt={author.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-semibold mt-4">{author.name}</h1>
      <p className="text-sm text-gray-600 mt-2">{author.bio}</p>
    </div>
  );
}
