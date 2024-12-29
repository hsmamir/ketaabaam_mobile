export * from './auth';
export * from './books';
export * from './library';

export interface Author {
    id: number;
    name: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Book {
    id: number;
    title: string;
    cover: string;
    about: string;
    author?: Author;
    genre?: Genre;
    likes_count: number;
}