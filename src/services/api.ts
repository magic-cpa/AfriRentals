import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8001/api/v1';

const api = axios.create({
    baseURL,
    withCredentials: true,
});

export default api;