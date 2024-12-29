import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

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
    api.post('/auth/login/', { phone, password }),
  register: (phone: string, password: string) => 
    api.post('/auth/register/', { phone, password }),
  refreshToken: (refresh: string) => 
    api.post('/auth/refresh/', { refresh }),
};

export const booksAPI = {
  getBooks: (page = 1, search?: string) => 
    api.get('/book/books/', { params: { page, search } }),
  getBookDetails: (id: number) => 
    api.get(`/book/books/${id}/`),
  likeBook: (id: number) => 
    api.post(`/book/books/${id}/like/`),
  rateBook: (id: number, rating: number) => 
    api.post(`/book/books/${id}/rate/`, { rating }),
};

export const libraryAPI = {
  getLibrary: () => 
    api.get('/book/library/'),
  addToLibrary: (bookId: number, category: number) => 
    api.post('/book/library/', { book: bookId, category }),
  updateProgress: (id: number, pagesRead: number) => 
    api.patch(`/book/library/${id}/`, { pages_read: pagesRead }),
};

export default api;