import { useState, useEffect, useCallback } from 'react';
import { Order, CreateOrderRequest } from '../types';
import { OrderService } from '../services/api';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await OrderService.getAll();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Falha ao carregar pedidos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const addOrder = useCallback(async (orderData: CreateOrderRequest) => {
    setLoading(true);
    setError(null);
    try {
      // Transforming for backend if necessary (mapping nested fields)
      const payload = {
        customer: orderData.customer,
        paymentMethod: orderData.paymentMethod,
        visitorId: localStorage.getItem('mineiro_visitor_id'),
        items: orderData.items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          observations: item.observations
        }))
      };
      const newOrder = await OrderService.create(payload);
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      console.error('Failed to add order:', err);
      setError('Falha ao processar pedido. Tente novamente.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId: string, status: Order['status']) => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await OrderService.updateStatus(orderId, status);
      setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));
    } catch (err) {
      console.error('Failed to update order status:', err);
      setError('Falha ao atualizar status do pedido.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { orders, loading, error, addOrder, updateOrderStatus, fetchOrders };
};
