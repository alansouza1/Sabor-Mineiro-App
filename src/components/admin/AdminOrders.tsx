import React, { useState, useMemo } from 'react';
import { Order } from '../../types';

interface AdminOrdersProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: Order['status']) => void;
  onViewDetails: (order: Order) => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, onStatusChange, onViewDetails }) => {
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders;
    return orders.filter(order => order.status === statusFilter);
  }, [orders, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none transition-all"
        >
          <option value="all">Todos os Status</option>
          <option value="pending">Pendente</option>
          <option value="preparing">Em Preparo</option>
          <option value="delivered">Entregue</option>
        </select>
      </div>
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Tempo</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-5 font-mono text-sm font-bold text-mineiro-brown">{order.id}</td>
                <td className="px-8 py-5 font-bold text-gray-900">{order.customer.name}</td>
                <td className="px-8 py-5 text-gray-600 font-medium">R$ {order.total.toFixed(2)}</td>
                <td className="px-8 py-5">
                  <select 
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider outline-none border-none cursor-pointer ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value as Order['status'])}
                  >
                    <option value="pending">Pendente</option>
                    <option value="preparing">Preparando</option>
                    <option value="delivered">Entregue</option>
                  </select>
                </td>
                <td className="px-8 py-5 text-sm text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</td>
                <td className="px-8 py-5">
                  <button 
                    onClick={() => onViewDetails(order)}
                    className="text-mineiro-brown font-bold text-sm hover:underline"
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-8 py-8 text-center text-gray-500">
                  Nenhum pedido encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
