import axios from 'axios';

const API = 'http://localhost:4000/api';

export const registerRequest = (user) => axios.post(`${API}/register`, user);
export const loginRequest = (user) => axios.post(`${API}/login`, user);
export const logoutRequest = (user) => axios.post(`${API}/logout`, user);
export const updateRequest = (user) => axios.post(`${API}/updateuser`, user);
export const profileRequest = (username) => axios.get(`${API}/profile`, {
    params : { username }
});

