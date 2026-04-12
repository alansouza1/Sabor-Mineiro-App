import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Minus, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number, observations?: string) => void;
  onUpdateQuantity: (id: number, observations: string | undefined, delta: number) => void;
  total: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity, 
  total 
}) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-mineiro-brown">Seu Pedido</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-mineiro-cream/30 p-6 rounded-full">
                    <ShoppingBag className="w-12 h-12 text-mineiro-brown opacity-20" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">Carrinho vazio</p>
                    <p className="text-gray-500">Escolha pratos deliciosos para começar.</p>
                  </div>
                </div>
              ) : (
                items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4">
                    <img 
                      src={item.imageUrl} 
                      className="w-20 h-20 rounded-2xl object-cover"
                      alt={item.name}
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id, item.observations)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-mineiro-brown font-bold text-sm mb-3">R$ {item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.observations, -1)}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.observations, 1)}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Taxa de Entrega</span>
                  <span className="text-mineiro-green font-medium">Grátis</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-2">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-mineiro-brown text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-mineiro-clay transition-all shadow-lg shadow-mineiro-brown/20 active:scale-[0.98]"
                >
                  Finalizar Pedido
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
