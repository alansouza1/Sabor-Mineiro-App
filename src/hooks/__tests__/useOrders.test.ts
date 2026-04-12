import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useOrders } from '../useOrders';

vi.mock('../../services/api', () => ({
  OrderService: {
    getAll: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockImplementation((data) => Promise.resolve({
      ...data,
      id: '#123',
      status: 'pending'
    })),
    updateStatus: vi.fn().mockImplementation((id, status) => Promise.resolve({
      id,
      status,
      customer: { name: 'Maria', phone: '31988888888', address: 'Rua Dois, 456', paymentMethod: 'cash' },
      items: [],
      total: 50
    }))
  }
}));

describe('useOrders', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty orders', () => {
    const { result } = renderHook(() => useOrders());
    expect(result.current.orders).toEqual([]);
  });

  it('should add a new order', async () => {
    const { result } = renderHook(() => useOrders());

    const newOrderData = {
      items: [],
      total: 100,
      customer: {
        name: 'Alan Souza',
        phone: '31999999999',
        address: 'Rua Teste, 123',
        paymentMethod: 'pix' as const,
      },
    };

    let addedOrder;
    await act(async () => {
      addedOrder = await result.current.addOrder(newOrderData);
    });

    expect(result.current.orders).toHaveLength(1);
    expect(result.current.orders[0].customer.name).toBe('Alan Souza');
    expect(result.current.orders[0].status).toBe('pending');
    expect(result.current.orders[0].id).toMatch(/^#\d{3}$/);
    expect(addedOrder).toBeDefined();
  });

  it('should update order status', async () => {
    const { result } = renderHook(() => useOrders());

    const newOrderData = {
      items: [],
      total: 50,
      customer: {
        name: 'Maria',
        phone: '31988888888',
        address: 'Rua Dois, 456',
        paymentMethod: 'cash' as const,
      },
    };

    let addedOrder: any;
    await act(async () => {
      addedOrder = await result.current.addOrder(newOrderData);
    });

    expect(result.current.orders[0].status).toBe('pending');

    await act(async () => {
      await result.current.updateOrderStatus(addedOrder.id, 'preparing');
    });

    expect(result.current.orders[0].status).toBe('preparing');
  });
});
