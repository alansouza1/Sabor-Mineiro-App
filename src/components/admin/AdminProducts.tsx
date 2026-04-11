import React, { useState, useMemo } from 'react';
import { Edit, Trash2, Search } from 'lucide-react';
import { Product } from '../../types';

interface AdminProductsProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ products, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Entradas', 'Pratos Principais', 'Bebidas', 'Sobremesas'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.categoria === selectedCategory;
      const matchesSearch = product.nome.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar produtos..."
            className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none transition-all"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex gap-6 group hover:shadow-xl transition-all">
            <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl">
              <img 
                src={product.url_imagem} 
                alt={product.nome} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 truncate">{product.nome}</h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">{product.categoria}</p>
              <p className="text-mineiro-brown font-bold text-lg">R$ {product.preco.toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => onEdit(product)}
                className="p-3 text-gray-400 hover:text-mineiro-brown hover:bg-mineiro-brown/5 rounded-xl transition-all"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onDelete(product.id)}
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            Nenhum produto encontrado.
          </div>
        )}
      </div>
    </div>
  );
};
