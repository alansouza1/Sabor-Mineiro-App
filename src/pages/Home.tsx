import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Search, Heart } from 'lucide-react';
import { ProductService } from '../services/api';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { Product } from '../types';

// Components
import { Header } from '../components/layout/Header';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryFilter } from '../components/menu/CategoryFilter';
import { ProductCard } from '../components/menu/ProductCard';
import { CartDrawer } from '../components/cart/CartDrawer';
import { ProductModal } from '../components/menu/ProductModal';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    cartCount 
  } = useCart();

  const { isFavorite, toggleFavorite } = useFavorites();

  const categories = ['Todos', 'Entradas', 'Pratos Principais', 'Bebidas', 'Sobremesas'];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.categoria === selectedCategory;
      const matchesSearch = product.nome.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFavorite = !showFavoritesOnly || isFavorite(product.id);
      return matchesCategory && matchesSearch && matchesFavorite;
    });
  }, [products, selectedCategory, searchQuery, showFavoritesOnly, isFavorite]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <HeroBanner />

        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="O que você quer comer hoje?"
                className="w-full bg-white border border-mineiro-cream/50 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-mineiro-brown/20 focus:border-mineiro-brown outline-none transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all border ${
                showFavoritesOnly 
                  ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-200' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-red-200'
              }`}
            >
              <Heart className={`w-5 h-5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              Favoritos
            </button>
          </div>

          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mineiro-brown"></div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product: Product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onOpenDetails={setSelectedProduct}
                  isFavorite={isFavorite(product.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Nenhum produto encontrado.
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
      />

      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        isFavorite={selectedProduct ? isFavorite(selectedProduct.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};
