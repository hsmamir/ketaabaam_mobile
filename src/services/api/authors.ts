import api from './base';

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