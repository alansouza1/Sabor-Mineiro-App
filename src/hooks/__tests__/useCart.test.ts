import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCart } from '../useCart';
import { Product } from '../../types';

const mockProduct: Product = {
  id: 1,
  name: 'Tutu à Mineira',
  description: 'Feijão refogado',
  price: 32.23,
  imageUrl: 'https://picsum.photos/seed/tutu/800/600',
  availableQuantity: 30,
  needsProduction: true,
  category: 'Pratos Principais',
};

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cart).toEqual([]);
    expect(result.current.cartTotal).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
    expect(result.current.cartTotal).toBe(mockProduct.price);
  });

  it('should update quantity', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(mockProduct.id, 2);
    });

    expect(result.current.cart[0].quantity).toBe(2);
    expect(result.current.cartTotal).toBe(mockProduct.price * 2);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cart).toHaveLength(0);
  });
});
