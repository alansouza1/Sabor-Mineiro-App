import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Package, 
  Store, 
  LogOut, 
  Info 
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  isDemo: boolean;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  isDemo, 
  onLogout 
}) => {
  return (
    <div className="flex flex-col h-full bg-mineiro-brown text-white">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-serif font-bold">Sabor Mineiro</h1>
          {isDemo && (
            <span className="bg-amber-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter text-white">
              Demo
            </span>
          )}
        </div>
        <p className="text-xs text-mineiro-cream/60 uppercase tracking-widest mt-1">Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <button 
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </button>
        <button 
          onClick={() => onTabChange('orders')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
        >
          <ClipboardList className="w-5 h-5" />
          <span className="font-medium">Pedidos</span>
        </button>
        <button 
          onClick={() => onTabChange('products')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'products' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
        >
          <Package className="w-5 h-5" />
          <span className="font-medium">Produtos</span>
        </button>
      </nav>

      {isDemo && (
        <div className="mx-4 mb-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[10px] leading-tight text-amber-200/80 font-medium">
              Você está em <span className="text-amber-400 font-bold">Modo Demo</span>. Ações de alteração estão desabilitadas para preservar os dados.
            </p>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link 
          to="/"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 transition-colors"
        >
          <Store className="w-5 h-5" />
          <span className="font-medium">Ver Loja</span>
        </Link>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};
