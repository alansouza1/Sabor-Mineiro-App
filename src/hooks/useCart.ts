import { useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '../types';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sabor_mineiro_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sabor_mineiro_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product, observations?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.observations === observations);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.observations === observations
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, observations }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number, observations?: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.observations === observations)));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number, observations?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, observations);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId && item.observations === observations
        ? { ...item, quantity }
        : item
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };
}
