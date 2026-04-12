import React from 'react';
import { motion } from 'motion/react';
import { Plus, Heart } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onOpenDetails,
  isFavorite,
  onToggleFavorite
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-3xl overflow-hidden border border-mineiro-cream/30 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
      onClick={() => onOpenDetails(product)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-mineiro-brown font-bold text-sm">
          R$ {product.price.toFixed(2)}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-900 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-10">
          {product.description}
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full bg-mineiro-brown text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-mineiro-clay transition-colors active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Adicionar
        </button>
      </div>
    </motion.div>
  );
}
