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