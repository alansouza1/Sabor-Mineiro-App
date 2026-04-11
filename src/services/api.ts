import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      console.error('Unauthorized access - redirecting to login');
      // Logic to handle unauthorized access (e.g., clear tokens, redirect)
    } else if (status === 403) {
      console.error('Forbidden access');
    } else if (status >= 500) {
      console.error('Server error');
    }

    return Promise.reject(error);
  }
);

export const ProductService = {
  getAll: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const { PRODUCTS } = await import('../constants');
    return PRODUCTS;
  },
  create: async (productData: unknown) => {
    return { id: Math.floor(Math.random() * 1000), status: 'SUCCESS' };
  },
  update: async (id: number, productData: unknown) => {
    return { id, status: 'SUCCESS' };
  },
  delete: async (id: number) => {
    return { id, status: 'SUCCESS' };
  }
};

export const OrderService = {
  create: async (orderData: unknown) => {
    return { id: Math.floor(Math.random() * 1000), status: 'SUCCESS' };
  },
};

export default api;
