import React from 'react';
import { X } from 'lucide-react';
import { Order } from '../../types';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold">Pedido {order.id}</h3>
            <p className="text-sm text-gray-500">
              {order.customer?.name || 'Cliente'} • {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Itens do Pedido</h4>
            {order.items.map((item, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-700">{item.quantity}x {item.nome}</span>
                  <span className="text-sm font-medium text-mineiro-brown">R$ {(item.preco * item.quantity).toFixed(2)}</span>
                </div>
                {item.observations && (
                  <p className="text-xs text-gray-500 italic">Obs: {item.observations}</p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-500 font-medium">Total</span>
            <span className="text-2xl font-bold text-mineiro-brown">R$ {order.total.toFixed(2)}</span>
          </div>

          <div className="bg-mineiro-cream/20 p-4 rounded-2xl">
            <p className="text-xs font-bold text-mineiro-brown uppercase tracking-wider mb-1">Status</p>
            <p className="font-bold text-mineiro-brown capitalize">
              {order.status === 'delivered' ? 'Entregue' : order.status === 'preparing' ? 'Em Preparo' : 'Pendente'}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
