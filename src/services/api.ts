import axios from 'axios';

const BASE_URL = 'https://api.ketaabaam.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (phone: string, password: string) =>
    api.post('/api/v1/auth/login/', { phone, password }),
  register: (phone: string, password: string) =>
    api.post('/api/v1/auth/register/', { phone, password }),
  refreshToken: (refresh: string) =>
    api.post('/api/v1/auth/refresh/', { refresh }),
};

export const booksAPI = {
  getBooks: (page = 1, search?: string) =>
    api.get('/api/v1/book/books/', { params: { page, search } }),
  getBookDetails: (id: number) =>
    api.get(`/api/v1/book/books/${id}/`),
  likeBook: (id: number) =>
    api.post(`/api/v1/book/books/${id}/like/`),
  rateBook: (id: number, rating: number) =>
    api.post(`/api/v1/book/books/${id}/rate/`, { rating }),
  getSuggestions: () =>
    api.get('/api/v1/book/suggest/'),
};

export const libraryAPI = {
  getLibrary: () =>
    api.get('/api/v1/book/library/'),
  addToLibrary: (bookId: number, category: number) =>
    api.post('/api/v1/book/library/', { book: bookId, category }),
  updateProgress: (id: number, pagesRead: number) =>
    api.patch(`/api/v1/book/library/${id}/`, { pages_read: pagesRead }),
};

export default api;