import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types';

const mockProduct: Product = {
  id: 1,
  nome: 'Tutu à Mineira',
  descricao: 'Feijão refogado e engrossado com farinha de mandioca.',
  preco: 32.23,
  url_imagem: 'https://picsum.photos/seed/tutu/800/600',
  qtd_disp: 30,
  precisa_produzir: true,
  categoria: 'Pratos Principais',
};

describe('ProductCard', () => {
  const mockOnAddToCart = vi.fn();
  const mockOnOpenDetails = vi.fn();
  const mockOnToggleFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onOpenDetails={mockOnOpenDetails}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(screen.getByText('Tutu à Mineira')).toBeInTheDocument();
    expect(screen.getByText('Feijão refogado e engrossado com farinha de mandioca.')).toBeInTheDocument();
    expect(screen.getByText('R$ 32.23')).toBeInTheDocument();
  });

  it('calls onAddToCart when add button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onOpenDetails={mockOnOpenDetails}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const addButton = screen.getByRole('button', { name: /Adicionar/i });
    fireEvent.click(addButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onToggleFavorite when favorite button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onOpenDetails={mockOnOpenDetails}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    // The favorite button is the first button (heart icon)
    const favoriteButton = screen.getAllByRole('button')[0];
    fireEvent.click(favoriteButton);

    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockProduct.id);
  });

  it('calls onOpenDetails when image is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onOpenDetails={mockOnOpenDetails}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const image = screen.getByAltText('Tutu à Mineira');
    fireEvent.click(image);

    expect(mockOnOpenDetails).toHaveBeenCalledTimes(1);
    expect(mockOnOpenDetails).toHaveBeenCalledWith(mockProduct);
  });
});
