import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const getUsers = () => api.get('/users');
export const getUserPosts = (userId) => api.get(`/posts?userId=${userId}`);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);
export const deleteUserPost = (postId) => api.delete(`/posts/${postId}`);
export const updateUserPost = (postId, data) => api.put(`/posts/${postId}`, data);
