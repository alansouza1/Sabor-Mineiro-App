import React from 'react';
import { X, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { Order } from '../../types';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case 'pix': return 'PIX';
      case 'card':
      case 'credit_card': return 'Cartão de Crédito';
      case 'cash': return 'Dinheiro';
      default: return 'Dinheiro';
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'pix': return <Smartphone className="w-4 h-4" />;
      case 'card':
      case 'credit_card': return <CreditCard className="w-4 h-4" />;
      case 'cash': return <Banknote className="w-4 h-4" />;
      default: return <Banknote className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('created') || s.includes('pending')) return 'Pendente';
    if (s.includes('production')) return 'Em Preparo';
    if (s.includes('delivery')) return 'Em Rota';
    if (s.includes('delivered')) return 'Entregue';
    if (s.includes('cancelled')) return 'Cancelado';
    if (s.includes('finished')) return 'Finalizado';
    return status;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold">Pedido {order.id.substring(0, 8)}...</h3>
            <p className="text-sm text-gray-500">
              {order.customer?.name || 'Cliente'} • {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Recent'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Itens do Pedido</h4>
            {order.items.map((item, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-700">{item.quantity}x {item.product.name}</span>
                  <span className="text-sm font-medium text-mineiro-brown">R$ {(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
                </div>
                {item.observations && (
                  <p className="text-xs text-gray-500 italic bg-white/50 p-2 rounded-lg mt-2">Obs: {item.observations}</p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-500 font-medium">Total</span>
            <span className="text-2xl font-bold text-mineiro-brown">R$ {order.total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Pagamento</p>
              <div className="flex items-center gap-2 text-gray-700">
                {getPaymentIcon(order.customer.paymentMethod)}
                <span className="text-sm font-bold">{getPaymentLabel(order.customer.paymentMethod)}</span>
              </div>
            </div>
            <div className="bg-mineiro-cream/20 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-mineiro-brown uppercase tracking-wider mb-1">Status</p>
              <p className="text-sm font-bold text-mineiro-brown capitalize">
                {getStatusLabel(order.status)}
              </p>
            </div>
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
