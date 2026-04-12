import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// visitorId generation for session isolation
const getVisitorId = () => {
  let vid = localStorage.getItem('mineiro_visitor_id');
  if (!vid) {
    vid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('mineiro_visitor_id', vid);
  }
  return vid;
};

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers['X-Visitor-Id'] = getVisitorId();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      window.dispatchEvent(new CustomEvent('unauthorized'));
    } else if (status === 403) {
      const message = error.response?.data?.message || '';
      if (message.includes('Demo')) {
        toast.error('Modo demonstração: você não tem permissão para realizar esta ação.');
      } else {
        toast.error('Você não tem permissão para realizar esta ação.');
      }
    } else if (status >= 500) {
      console.error('Server error');
      toast.error('Ocorreu um erro no servidor.');
    }

    return Promise.reject(error);
  }
);

export const ProductService = {
  getAll: async () => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },
  create: async (productData: Partial<Product>) => {
    const response = await api.post<Product>('/products', productData);
    return response.data;
  },
  update: async (id: number, productData: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, productData);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};

export const OrderService = {
  getAll: async () => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },
  create: async (orderData: any) => {
    const response = await api.post<Order>('/orders', orderData);
    return response.data;
  },
  updateStatus: async (id: string, status: Order['status']) => {
    const response = await api.patch<Order>(`/orders/${id}/status`, { status });
    return response.data;
  }
};

export default api;
