import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  editingProduct: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProduct
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Pratos Principais',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        description: editingProduct.description,
        imageUrl: editingProduct.imageUrl
      });
    } else {
      setFormData({
        name: '',
        price: '',
        category: 'Pratos Principais',
        description: '',
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/600`
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category as any,
      description: formData.description,
      imageUrl: formData.imageUrl,
      availableQuantity: editingProduct?.availableQuantity ?? 99,
      needsProduction: editingProduct?.needsProduction ?? true
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            {editingProduct ? 'Editar Produto' : 'Novo Produto'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nome do Produto</label>
            <input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 transition-all" 
              placeholder="Ex: Frango com Quiabo"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Preço (R$)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
              <input 
                required
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 transition-all" 
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Categoria</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 transition-all"
            >
              <option value="Entradas">Entradas</option>
              <option value="Pratos Principais">Pratos Principais</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Sobremesas">Sobremesas</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">URL da Imagem</label>
            <input 
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 transition-all" 
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Descrição</label>
            <textarea 
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 h-32 resize-none transition-all" 
              placeholder="Descreva os ingredientes e o sabor..."
            />
          </div>

          <button 
            type="submit"
            className="md:col-span-2 w-full bg-mineiro-brown text-white py-4 rounded-2xl font-bold text-lg hover:bg-mineiro-clay transition-all shadow-lg shadow-mineiro-brown/20 mt-4"
          >
            {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
          </button>
        </form>
      </div>
    </div>
  );
};
