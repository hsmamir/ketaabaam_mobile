import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publishersAPI } from "../../services/api";
import { Publisher } from "../../types";
import Loading from "../../components/Loading";

export default function PublisherPage() {
  const { id } = useParams<{ id: string }>();
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublisherDetails = async () => {
      try {
        const response = await publishersAPI.getPublisherDetails(Number(id));
        setPublisher(response.data);
      } catch (error) {
        console.error("Error fetching publisher details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublisherDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!publisher) {
    return <div>Publisher not found</div>;
  }

  return (
    <div className="p-4">
      <img
        src={publisher.image}
        alt={publisher.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-semibold mt-4">{publisher.name}</h1>
      <p className="text-gray-600">{publisher.about}</p>
      <p className="text-gray-600">{publisher.address}</p>
      <a
        href={publisher.website}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline"></a>
    </div>
  );
}
