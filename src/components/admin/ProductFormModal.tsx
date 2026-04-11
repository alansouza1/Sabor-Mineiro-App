import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  editingProduct: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProduct
}) => {
  const [formData, setFormData] = React.useState({
    nome: '',
    preco: '',
    categoria: 'Pratos Principais',
    descricao: '',
    url_imagem: ''
  });

  React.useEffect(() => {
    if (isOpen) {
      if (editingProduct) {
        setFormData({
          nome: editingProduct.nome,
          preco: editingProduct.preco.toString(),
          categoria: editingProduct.categoria,
          descricao: editingProduct.descricao,
          url_imagem: editingProduct.url_imagem
        });
      } else {
        setFormData({
          nome: '',
          preco: '',
          categoria: 'Pratos Principais',
          descricao: '',
          url_imagem: `https://picsum.photos/seed/${Math.random()}/800/600`
        });
      }
    }
  }, [isOpen, editingProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: editingProduct?.id || Math.floor(Math.random() * 10000),
      nome: formData.nome,
      preco: parseFloat(formData.preco),
      categoria: formData.categoria as any,
      descricao: formData.descricao,
      url_imagem: formData.url_imagem,
      qtd_disp: editingProduct?.qtd_disp ?? 99,
      precisa_produzir: editingProduct?.precisa_produzir ?? true
    };
    onSave(newProduct);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold">{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nome do Produto</label>
            <input 
              required
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 transition-all" 
              placeholder="Ex: Feijoada Completa" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Preço (R$)</label>
              <input 
                required
                type="number" 
                step="0.01"
                min="0"
                value={formData.preco}
                onChange={(e) => setFormData({...formData, preco: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 transition-all" 
                placeholder="0.00" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Categoria</label>
              <select 
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 transition-all"
              >
                <option>Entradas</option>
                <option>Pratos Principais</option>
                <option>Bebidas</option>
                <option>Sobremesas</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Descrição</label>
            <textarea 
              required
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 h-24 resize-none transition-all" 
              placeholder="Descreva o prato..." 
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-mineiro-brown text-white py-4 rounded-2xl font-bold text-lg hover:bg-mineiro-clay transition-all shadow-lg shadow-mineiro-brown/20"
          >
            {editingProduct ? 'Atualizar Produto' : 'Salvar Produto'}
          </button>
        </form>
      </div>
    </div>
  );
};
