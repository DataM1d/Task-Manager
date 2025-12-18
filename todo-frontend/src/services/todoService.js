import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos',
});

export const todoService = {
  getAll: () => API.get('/'),
  
  create: (title) => API.post('/', { title }),

  update: (id, data) => API.put(`/${id}`, data),

  delete: (id) => API.delete(`/${id}`),

  deleteMultiple: (ids) => Promise.all(ids.map(id => API.delete(`/${id}`))),
};