
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router'; 

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();

    if (error.response && error.response.status === 401) {
      authStore.logout();
      router.push({ name: 'login' });

    }
    return Promise.reject(error);
  }
);

export default apiClient;
