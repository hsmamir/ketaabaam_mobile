export * from './auth';
export * from './books';

export interface Author {
  id: number;
  image?: string;
  name: string;
  bio?: string;
  birthdate?: string;
  email?: string;
}

export interface Genre {
  id: number;
  name: string;
}

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
  average_rating: number;
}

export enum CategoryEnum {
  CurrentlyReading = 1,
  WantToRead = 2,
  Finished = 3,
}

export interface LibraryBook {
  id: number;
  book: number;
  book_title: string;
  author_name: string;
  cover?: string;
  category: CategoryEnum;
  pages_read: number;
  progress: number;
  created_at: string;
}

export interface PaginatedLibraryList {
  count: number;
  next: string | null;
  previous: string | null;
  results: LibraryBook[];
}

export interface UserRegistration {
  phone: string;
  password: string;
  result: string;
}

export interface UserLogin {
  phone: string;
  password: string;
  access: string;
  refresh: string;
  user_type: UserType;
}

export interface PatchedLibrary {
  id: number;
  book: number;
  book_title: string;
  author_name: string;
  cover?: string;
  category: CategoryEnum;
  pages_read: number;
  progress: number;
  created_at: string;
}