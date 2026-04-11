import { renderHook, act } from '@testing-library/react';
import { useCart } from '../useCart';
import { Product } from '../../types';

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

const mockProduct: Product = {
  id: 1,
  nome: 'Tutu à Mineira',
  descricao: 'Feijão refogado',
  preco: 32.23,
  url_imagem: 'https://picsum.photos/seed/tutu/800/600',
  qtd_disp: 30,
  precisa_produzir: true,
  categoria: 'Pratos Principais',
};

describe('useCart', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with an empty cart', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cart).toEqual([]);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });

  it('should add a product to the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe(mockProduct.id);
    expect(result.current.cart[0].quantity).toBe(1);
    expect(result.current.cartCount).toBe(1);
    expect(result.current.cartTotal).toBe(mockProduct.preco);
  });

  it('should increment quantity if the same product is added again', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
    expect(result.current.cartCount).toBe(2);
    expect(result.current.cartTotal).toBe(mockProduct.preco * 2);
  });

  it('should add as a separate item if observations are different', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 'Sem cebola');
      result.current.addToCart(mockProduct, 'Com pimenta');
    });

    expect(result.current.cart).toHaveLength(2);
    expect(result.current.cart[0].observations).toBe('Sem cebola');
    expect(result.current.cart[1].observations).toBe('Com pimenta');
    expect(result.current.cartCount).toBe(2);
  });

  it('should remove a product from the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cart).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
  });

  it('should remove a specific product with observations', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 'Sem cebola');
      result.current.addToCart(mockProduct, 'Com pimenta');
      result.current.removeFromCart(mockProduct.id, 'Sem cebola');
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].observations).toBe('Com pimenta');
  });

  it('should update quantity of a product', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, undefined, 2);
    });

    expect(result.current.cart[0].quantity).toBe(3);

    act(() => {
      result.current.updateQuantity(mockProduct.id, undefined, -1);
    });

    expect(result.current.cart[0].quantity).toBe(2);
  });

  it('should not reduce quantity below 1', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(mockProduct.id, undefined, -5);
    });

    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
  });
});
