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
      console.warn("Token inválido o expirado. Limpiando credenciales y redirigiendo...");
      
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      const currentPath = window.location.pathname;

      if (currentPath.startsWith('/admin') && currentPath !== '/admin/login') {
        window.location.href = '/admin/login';
      } 
      else if (!currentPath.startsWith('/admin') && currentPath !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;