import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dead-man-switch-vs7s.onrender.com/api/v1',
    withCredentials:true
})

export default api;
