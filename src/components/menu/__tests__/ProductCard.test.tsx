import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types';

const mockProduct: Product = {
  id: 1,
  name: 'Tutu à Mineira',
  description: 'Feijão refogado e engrossado com farinha de mandioca.',
  price: 32.23,
  imageUrl: 'https://picsum.photos/seed/tutu/800/600',
  availableQuantity: 30,
  needsProduction: true,
  category: 'Pratos Principais',
};

describe('ProductCard', () => {
  it('should render product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onOpenDetails={() => {}} 
        onAddToCart={() => {}}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />
    );

    expect(screen.getByText(mockProduct.name)).toBeDefined();
    expect(screen.getByText(/32\.23/)).toBeDefined();
  });

  it('should call onOpenModal when clicking the card', () => {
    const onOpenDetails = vi.fn();
    render(
      <ProductCard 
        product={mockProduct} 
        onOpenDetails={onOpenDetails} 
        onAddToCart={() => {}}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />
    );

    fireEvent.click(screen.getByText(mockProduct.name));
    expect(onOpenDetails).toHaveBeenCalledWith(mockProduct);
  });

  it('should call onAddToCart when clicking the add button', () => {
    const onAddToCart = vi.fn();
    render(
      <ProductCard 
        product={mockProduct} 
        onOpenDetails={() => {}} 
        onAddToCart={onAddToCart}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Adicionar/i }));
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
