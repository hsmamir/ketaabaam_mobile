import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to Ketaabaam</h1>
            <p className="text-lg mb-4">Your personal book library and recommendation system.</p>
            <div className="flex space-x-4">
                <Link to="/explore" className="text-blue-500">Explore Books</Link>
                <Link to="/library" className="text-blue-500">Your Library</Link>
                <Link to="/settings" className="text-blue-500">Settings</Link>
            </div>
        </div>
    );
}