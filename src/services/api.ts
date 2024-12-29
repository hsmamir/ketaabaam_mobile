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
    api.get('/api/v1/book/library/', {
      params: { page, page_size, search },
    }),
  createLibraryBook: (libraryData: any) =>
    api.post('/api/v1/book/library/', libraryData),
  getLibraryBook: (id: number) =>
    api.get(`/api/v1/book/library/${id}/`),
  updateLibraryBook: (id: number, updatedData: any) =>
    api.patch(`/api/v1/book/library/${id}/`, updatedData),
  deleteLibraryBook: (id: number) =>
    api.delete(`/api/v1/book/library/${id}/`),
  addToLibrary: (id: number, libraryData: any) =>
    api.post(`/api/v1/book/library/${id}/add-to-library/`, libraryData),
  removeFromLibrary: (id: number, libraryData: any) =>
    api.post(`/api/v1/book/library/${id}/remove-from-library/`, libraryData),
};

export default api;