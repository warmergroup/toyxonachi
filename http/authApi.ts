import axios from 'axios';
import { getToken } from '~/utils/auth';
import { API_URL } from './index';

// Auth so'rovlari uchun alohida instance
const $authApi = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
    }
});

// So'rov yuborishdan oldin token qo'shish
$authApi.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log('Request failed >>>', error);
        return Promise.reject(error);
    }
);

// Javoblarni qayta ishlash
$authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error);
    }
);

export default $authApi;
