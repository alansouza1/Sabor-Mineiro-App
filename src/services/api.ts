import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const userJson = localStorage.getItem('mineiro_user');
    if (userJson) {
      const user = JSON.parse(userJson);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
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
      localStorage.removeItem('mineiro_user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
      }
    } else if (status === 403) {
      const message = error.response?.data?.message || '';
      if (message.includes('Demo')) {
        alert('Modo demonstração: você não tem permissão para realizar esta ação.');
      } else {
        alert('Você não tem permissão para realizar esta ação.');
      }
    } else if (status >= 500) {
      console.error('Server error');
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
