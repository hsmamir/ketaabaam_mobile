export * from './auth';
export * from './books';
export * from './library';

export interface Author {
  name: string;
}

export interface Genre {
  name: string;
}

export interface Book {
  id: number;
  title: string;
  cover: string;
  about: string | null;
  author: Author;
  genre: Genre;
  likes_count: number;
}

export interface LibraryBook {
  id: number;
  book: Book;
  category: number; // 1: Currently Reading, 2: Want to Read, 3: Finished
  progress?: number; // Percentage or any other metric
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
  // Add other registration fields as necessary
}

export interface UserLogin {
  access: string;
  refresh: string;
  // Add other login response fields if necessary
}

export interface PatchedLibrary {
  progress?: number;
  category?: number;
  // Add other fields if necessary
}