import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, observations?: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  isFavorite,
  onToggleFavorite
}) => {
  const [observations, setObservations] = React.useState('');
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden"
          >
            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={onClose}
                  className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-900 hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onToggleFavorite(product.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-900 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex-1 p-8 flex flex-col">
                <div className="flex-1">
                  <span className="text-xs font-bold text-mineiro-brown uppercase tracking-widest bg-mineiro-brown/10 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mt-4 mb-2">{product.name}</h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <span className="text-gray-600 font-medium">Preço Unitário</span>
                      <span className="text-2xl font-bold text-mineiro-brown">R$ {product.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Observações</label>
                      <textarea 
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-mineiro-brown/20 outline-none transition-all resize-none h-24"
                        placeholder="Ex: Sem cebola, caprichar no queijo..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => {
                      onAddToCart(product, observations);
                      setObservations('');
                      onClose();
                    }}
                    className="w-full bg-mineiro-brown text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-mineiro-clay transition-all shadow-lg shadow-mineiro-brown/20"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
