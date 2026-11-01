import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api/tasks';

const api = axios.create({ baseURL: API_BASE });

export const fetchTasks = (params = {}) => api.get('/', { params }).then((r) => r.data);
export const fetchTaskById = (id) => api.get(`/${id}`).then((r) => r.data);
export const createTask = (data) => api.post('/', data).then((r) => r.data);
export const updateTask = (id, data) => api.put(`/${id}`, data).then((r) => r.data);
export const updateTaskStatus = (id, status) =>
  api.patch(`/${id}/status`, { status }).then((r) => r.data);
export const deleteTask = (id) => api.delete(`/${id}`).then((r) => r.data);
