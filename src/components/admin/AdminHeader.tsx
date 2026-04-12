import React from 'react';
import { Plus } from 'lucide-react';

interface AdminHeaderProps {
  activeTab: string;
  onAddProduct: () => void;
  isDemo: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  activeTab, 
  onAddProduct, 
  isDemo 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h2>
      <div className="flex items-center gap-4">
        {activeTab === 'products' && (
          <button 
            onClick={onAddProduct}
            disabled={isDemo}
            className={`bg-mineiro-brown text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all ${isDemo ? 'opacity-50 cursor-not-allowed' : 'hover:bg-mineiro-clay'}`}
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        )}
      </div>
    </header>
  );
};
