import api from './api/base';
import { CategoryEnum, LibraryBook } from '../types/index';

export const booksAPI = {
  getBooks: (page = 1, page_size = 10, search?: string) =>
    api.get('/book/books/', { params: { page, page_size, search } }),
  getBookDetails: (id: number) =>
    api.get(`/book/books/${id}/`),
  getBookLikeStatus: (id: number) =>
    api.get(`/book/books/${id}/like/`),
  likeBook: (id: number) =>
    api.post(`/book/books/${id}/like/`),
  rateBook: (id: number, rating: number) =>
    api.post(`/book/books/${id}/rate/`, { rating }),
  getSuggestions: () =>
    api.get('/book/suggest/'),
  getBookFormats: () =>
    api.get('/book/books/book-formats/'),
};

export const authAPI = {
  login: (phone: string, password: string) =>
    api.post('/auth/login/', { phone, password }),
  register: (phone: string, password: string) =>
    api.post('/auth/register/', { phone, password }),
  refreshToken: (refresh: string) =>
    api.post('/auth/refresh/', { refresh }),
  verifyPhone: (phone: string, verificationCode: string) =>
    api.post('/auth/verify-phone/', { phone, verification_code: verificationCode }),
  getVerificationCode: (phone: string) =>
    api.post('/auth/get-verification-code/', { phone }),
  resetPassword: (phone: string, verificationCode: string, newPassword: string, confirmPassword: string) =>
    api.post('/auth/reset-password/', {
      phone,
      verification_code: verificationCode,
      new_password: newPassword,
      confirm_password: confirmPassword
    }),
  changePassword: (password: string, newPassword: string, confirmPassword: string) =>
    api.post('/auth/changepassword/', {
      password,
      new_password: newPassword,
      confirm_password: confirmPassword
    }),
};

export const libraryAPI = {
  getLibrary: (page?: number, page_size?: number, search?: string) =>
    api.get('/book/library/', { params: { page, page_size, search } }),
  addToLibrary: (bookId: number, category: CategoryEnum) =>
    api.post('/book/library/', { book: bookId, category }),
  updateProgress: (id: number, pagesRead: number) =>
    api.patch(`/book/library/${id}/`, { pages_read: pagesRead }),
  removeFromLibrary: (id: number) =>
    api.delete(`/book/library/${id}/`),
  getLibraryBook: (id: number) =>
    api.get(`/book/library/${id}/`),
  updateLibraryBook: (id: number, data: Partial<LibraryBook>) =>
    api.patch(`/book/library/${id}/`, data),
  deleteLibraryBook: (id: number) =>
    api.delete(`/book/library/${id}/`),
  addToLibraryById: (id: number) =>
    api.post(`/book/library/${id}/add-to-library/`),
  removeFromLibraryById: (id: number) =>
    api.post(`/book/library/${id}/remove-from-library/`),
};

export const authorsAPI = {
  getAuthors: (page = 1, search?: string) =>
    api.get('/book/authors/', { params: { page, search } }),
  getAuthorDetails: (id: number) =>
    api.get(`/book/authors/${id}/`),
  getAuthorBooks: (authorId: number, page = 1) =>
    api.get(`/book/authors/author_books/${authorId}/`, { params: { page } }),
  followAuthor: (id: number) =>
    api.post(`/book/authors/${id}/follow/`),
  getFollowStatus: (id: number) =>
    api.get(`/book/authors/${id}/follow/`),
};

export const publishersAPI = {
  getPublisherDetails: (id: number) =>
    api.get(`/book/publishers/${id}/`),
  getPublisherBooks: (publisher_id: number) =>
    api.get(`/book/publishers/publisher_books/${publisher_id}/`),
  followPublisher: (id: number) =>
    api.post(`/book/publishers/${id}/follow/`),
  getFollowStatus: (id: number) =>
    api.get(`/book/publishers/${id}/follow/`),
};

export default api;