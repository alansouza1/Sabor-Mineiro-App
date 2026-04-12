import React, { useState, useMemo } from 'react';
import { Product } from '../../types';

interface AdminProductsProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ products, onEdit, onDelete }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <input 
          type="text"
          placeholder="Buscar produto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64 bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none transition-all"
        />
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {['Todos', 'Entradas', 'Pratos Principais', 'Bebidas', 'Sobremesas'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-mineiro-brown text-white shadow-md' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-40 mb-4 rounded-2xl overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="space-y-1 mb-4">
              <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">{product.category}</p>
              <p className="text-mineiro-brown font-bold text-lg">R$ {product.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onEdit(product)}
                className="flex-1 bg-gray-50 text-gray-600 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-100 transition-all"
              >
                Editar
              </button>
              <button 
                onClick={() => onDelete(product.id)}
                className="flex-1 bg-red-50 text-red-500 py-2.5 rounded-xl font-bold text-xs hover:bg-red-100 transition-all"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
