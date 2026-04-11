import { useState, useEffect, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('sabor-mineiro-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sabor-mineiro-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const isFavorite = useCallback((productId: number) => favorites.includes(productId), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
