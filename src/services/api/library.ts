import api from './base';
import { CategoryEnum } from '../../types';

export const libraryAPI = {
  getLibrary: () => 
    api.get('/book/library/'),
    
  addToLibrary: (bookId: number, category: CategoryEnum) => 
    api.post('/book/library/', { book: bookId, category }),
    
  updateProgress: (id: number, pagesRead: number) => 
    api.patch(`/book/library/${id}/`, { pages_read: pagesRead }),
    
  removeFromLibrary: (id: number) =>
    api.delete(`/book/library/${id}/`),
};