import axios from 'axios';

const API = 'http://localhost:4000/api';

export const createPostRequest = (post) => axios.post(`${API}/createPost`, post);
export const getPostRequest = () => axios.get(`${API}/getPost`);
export const reactionRequest = (reaction) => axios.put(`${API}/reaction`, reaction);
