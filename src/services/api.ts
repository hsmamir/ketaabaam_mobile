import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ketaabaam.com', // Replace with your API base URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const booksAPI = {
  getBooks: (page = 1, page_size = 10, search?: string) =>
    api.get('/api/v1/book/books/', { params: { page, page_size, search } }),
  getBookDetails: (id: number) =>
    api.get(`/api/v1/book/books/${id}/`),
  getBookLikeStatus: (id: number) =>
    api.get(`/api/v1/book/books/${id}/like/`),
  likeBook: (id: number) =>
    api.post(`/api/v1/book/books/${id}/like/`),
  rateBook: (id: number, rating: number) =>
    api.post(`/api/v1/book/books/${id}/rate/`, { rating }),
  getSuggestions: () =>
    api.get('/api/v1/book/suggest/'),
};

export const authAPI = {
  login: (phone: string, password: string) =>
    api.post('/api/v1/auth/login/', { phone, password }),
  register: (phone: string, password: string) =>
    api.post('/api/v1/auth/register/', { phone, password }),
  refreshToken: (refresh: string) =>
    api.post('/api/v1/auth/refresh/', { refresh }),
};

export const libraryAPI = {
  getLibrary: (page?: number, page_size?: number, search?: string) =>
    api.get('/api/v1/book/library/', { params: { page, page_size, search } }),
};

export const authorsAPI = {
  getAuthorDetails: (id: number) =>
    api.get(`/api/v1/book/authors/${id}/`),
  getAuthorBooks: (id: number) =>
    api.get(`/api/v1/book/authors/author_books/${id}/`), // Ensure this is part of authorsAPI
};

export const publishersAPI = {
  getPublisherDetails: (id: number) =>
    api.get(`/api/v1/book/publishers/${id}/`),
};

export default api;