import api from './base';

export const booksAPI = {
  getBooks: (page = 1, search?: string) => 
    api.get('/book/books/', { params: { page, search } }),
    
  getBookDetails: (id: number) => 
    api.get(`/book/books/${id}/`),
    
  likeBook: (id: number) => 
    api.post(`/book/books/${id}/like/`),
    
  getLikeStatus: (id: number) =>
    api.get(`/book/books/${id}/like/`),
    
  rateBook: (id: number, rating: number) => 
    api.post(`/book/books/${id}/rate/`, { rating }),
    
  getRating: (id: number) =>
    api.get(`/book/books/${id}/rating/`),
    
  getBookFormats: () =>
    api.get('/book/books/book-formats/'),
};