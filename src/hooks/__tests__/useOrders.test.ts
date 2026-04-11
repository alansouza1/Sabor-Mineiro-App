import { renderHook, act } from '@testing-library/react';
import { useOrders } from '../useOrders';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useOrders', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with empty orders', () => {
    const { result } = renderHook(() => useOrders());
    expect(result.current.orders).toEqual([]);
  });

  it('should add a new order', () => {
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
    act(() => {
      addedOrder = result.current.addOrder(newOrderData);
    });

    expect(result.current.orders).toHaveLength(1);
    expect(result.current.orders[0].customer.name).toBe('Alan Souza');
    expect(result.current.orders[0].status).toBe('pending');
    expect(result.current.orders[0].id).toMatch(/^#\d{3}$/);
    expect(addedOrder).toBeDefined();
  });

  it('should update order status', () => {
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
    act(() => {
      addedOrder = result.current.addOrder(newOrderData);
    });

    expect(result.current.orders[0].status).toBe('pending');

    act(() => {
      result.current.updateOrderStatus(addedOrder.id, 'preparing');
    });

    expect(result.current.orders[0].status).toBe('preparing');
  });
});
