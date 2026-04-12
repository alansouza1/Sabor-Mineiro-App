import React, { useState, useMemo } from 'react';
import { Order } from '../../types';

interface AdminOrdersProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: Order['status']) => void;
  onViewDetails: (order: Order) => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, onStatusChange, onViewDetails }) => {
  const [statusFilter, setStatusFilter] = useState<string | 'all'>('all');

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders;
    return orders.filter(order => order.status === statusFilter);
  }, [orders, statusFilter]);

  // Unified mapping for UI
  const getStatusInfo = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('created') || s.includes('pending')) return { label: 'Pendente', color: 'bg-amber-100 text-amber-700' };
    if (s.includes('production')) return { label: 'Em Preparo', color: 'bg-blue-100 text-blue-700' };
    if (s.includes('delivery')) return { label: 'Em Rota', color: 'bg-purple-100 text-purple-700' };
    if (s.includes('delivered')) return { label: 'Entregue', color: 'bg-green-100 text-green-700' };
    if (s.includes('cancelled')) return { label: 'Cancelado', color: 'bg-red-100 text-red-700' };
    if (s.includes('finished')) return { label: 'Finalizado', color: 'bg-gray-100 text-gray-700' };
    return { label: status, color: 'bg-gray-100 text-gray-600' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 md:hidden">Lista de Pedidos</h3>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl py-2 px-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none text-sm shadow-sm"
        >
          <option value="all">Todos os Status</option>
          <option value="Created">Pendente</option>
          <option value="In production">Em Preparo</option>
          <option value="Out for delivery">Em Rota</option>
          <option value="Delivered">Entregue</option>
          <option value="Cancelled by client">Cancelado</option>
        </select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
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
            {filteredOrders.map(order => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5 font-mono text-sm font-bold text-mineiro-brown">{order.id.substring(0,8)}...</td>
                  <td className="px-8 py-5 font-bold text-gray-900">{order.customer.name}</td>
                  <td className="px-8 py-5 text-gray-600 font-medium">R$ {order.total.toFixed(2)}</td>
                  <td className="px-8 py-5">
                    <select 
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider outline-none border-none cursor-pointer ${statusInfo.color}`}
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value as any)}
                    >
                      <option value="Created">Pendente</option>
                      <option value="In production">Preparando</option>
                      <option value="Out for delivery">Em Rota</option>
                      <option value="Delivered">Entregue</option>
                      <option value="Cancelled by client">Cancelado</option>
                      <option value="Finished">Finalizado</option>
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map(order => {
          const statusInfo = getStatusInfo(order.status);
          return (
            <div key={order.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID #{order.id.substring(0,6)}</p>
                  <h4 className="font-bold text-gray-900">{order.customer.name}</h4>
                </div>
                <p className="font-bold text-mineiro-brown text-lg">R$ {order.total.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center justify-between gap-4">
                <select 
                  className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider outline-none border-none cursor-pointer ${statusInfo.color}`}
                  value={order.status}
                  onChange={(e) => onStatusChange(order.id, e.target.value as any)}
                >
                  <option value="Created">Pendente</option>
                  <option value="In production">Preparando</option>
                  <option value="Out for delivery">Em Rota</option>
                  <option value="Delivered">Entregue</option>
                  <option value="Cancelled by client">Cancelado</option>
                  <option value="Finished">Finalizado</option>
                </select>
                <button 
                  onClick={() => onViewDetails(order)}
                  className="bg-gray-50 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap"
                >
                  Ver Detalhes
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-[2.5rem] p-12 text-center text-gray-500 border border-gray-100">
          Nenhum pedido encontrado.
        </div>
      )}
    </div>
  );
};
