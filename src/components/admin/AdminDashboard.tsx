import React from 'react';
import { DollarSign, ClipboardList, Users, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Order } from '../../types';

interface AdminDashboardProps {
  orders: Order[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders }) => {
  const stats = [
    { label: 'Vendas Hoje', value: 'R$ 1.240', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Novos Pedidos', value: '12', icon: ClipboardList, color: 'bg-blue-500' },
    { label: 'Clientes Ativos', value: '48', icon: Users, color: 'bg-purple-500' },
    { label: 'Crescimento', value: '+14%', icon: TrendingUp, color: 'bg-amber-500' },
  ];

  const salesData = [
    { name: 'Seg', sales: 4000 },
    { name: 'Ter', sales: 3000 },
    { name: 'Qua', sales: 2000 },
    { name: 'Qui', sales: 2780 },
    { name: 'Sex', sales: 1890 },
    { name: 'Sab', sales: 2390 },
    { name: 'Dom', sales: 3490 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-2xl text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Vendas da Semana</h3>
          <div className="h-80 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={100}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5D4037" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#5D4037" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="sales" stroke="#5D4037" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Pedidos Recentes</h3>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-mineiro-brown text-sm">
                    {order.id}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{order.customer.name}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {order.status === 'delivered' ? 'Entregue' : order.status === 'preparing' ? 'Em Preparo' : 'Pendente'}
                </span>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-gray-500 text-center py-4">Nenhum pedido recente.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
