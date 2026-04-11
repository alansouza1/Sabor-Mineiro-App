import { useState, useEffect, useCallback } from 'react';
import { Order } from '../types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('mineiro_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to parse orders from local storage', e);
      }
    }
  }, []);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `#${Math.floor(Math.random() * 900) + 100}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => {
      const updatedOrders = [newOrder, ...prev];
      localStorage.setItem('mineiro_orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev => {
      const updatedOrders = prev.map(o => o.id === orderId ? { ...o, status } : o);
      localStorage.setItem('mineiro_orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  }, []);

  return { orders, addOrder, updateOrderStatus };
};
