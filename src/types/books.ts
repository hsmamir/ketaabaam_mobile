export interface Book {
  id: number;
  title: string;
  about?: string;
  cover?: string;
  isbn: string;
  synopsis?: string;
  published: string;
  pages: number;
  author: Author;
  publisher: Publisher;
  genre: Genre;
  book_format: BookFormat;
  likes_count: number;
  average_rating: string;
}

export interface Author {
  id: number;
  image?: string;
  name: string;
  bio?: string;
  birthdate?: string;
  email?: string;
}

export interface Publisher {
  id: number;
  image?: string;
  name: string;
  about?: string;
  address?: string;
  website?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface BookFormat {
  id: number;
  format_name: string;
}