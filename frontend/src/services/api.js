import axios from 'axios';

const api = axios.create({
  baseURL: `http://${window.location.hostname}:8000/api/`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Sesión expirada. Redirigiendo al login...");
      localStorage.removeItem('access_token'); 
      localStorage.removeItem('refresh_token');
      window.location.href = '/admin/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;