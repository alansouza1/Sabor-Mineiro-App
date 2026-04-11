import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Package, 
  Plus, 
  AlertCircle,
  Store,
  LogOut,
  Info
} from 'lucide-react';
import { ProductService } from '../services/api';
import { Product, Order } from '../types';
import { useOrders } from '../hooks/useOrders';
import { OrderDetailsModal } from '../components/common/OrderDetailsModal';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminProducts } from '../components/admin/AdminProducts';
import { useAuth } from '../hooks/useAuth';

type Tab = 'dashboard' | 'orders' | 'products';

export const Admin: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const isDemo = user?.roles.includes('ROLE_DEMO');
  
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { orders, updateOrderStatus } = useOrders();
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ProductService.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteProduct = (id: number) => {
    if (isDemo) {
      alert('Modo demonstração: você não tem permissão para excluir produtos.');
      return;
    }
    setProductToDelete(id);
  };

  const confirmDelete = async () => {
    if (productToDelete !== null) {
      setIsLoading(true);
      try {
        await ProductService.delete(productToDelete);
        setProducts(prev => prev.filter(p => p.id !== productToDelete));
        setProductToDelete(null);
      } catch (error) {
        console.error('Failed to delete product', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOpenCreateModal = () => {
    if (isDemo) {
      alert('Modo demonstração: você não tem permissão para criar produtos.');
      return;
    }
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    if (isDemo) {
      alert('Modo demonstração: você não tem permissão para editar produtos.');
      return;
    }
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    setIsLoading(true);
    try {
      if (editingProduct) {
        const updated = await ProductService.update(editingProduct.id, productData);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
      } else {
        const created = await ProductService.create(productData);
        setProducts(prev => [created, ...prev]);
      }
      setIsProductModalOpen(false);
    } catch (error) {
      console.error('Failed to save product', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    if (isDemo) {
      alert('Modo demonstração: você não tem permissão para alterar o status de pedidos.');
      return;
    }
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-mineiro-brown text-white hidden md:flex flex-col sticky top-0 h-screen">
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
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="font-medium">Pedidos</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')}
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
                Você está em <span className="text-amber-400 font-bold">Modo Demo</span>. Ações de alteração estão desabilitadas para preservar os dados da demonstração.
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
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            {activeTab === 'products' && (
              <button 
                onClick={handleOpenCreateModal}
                disabled={isDemo}
                className={`bg-mineiro-brown text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all ${isDemo ? 'opacity-50 cursor-not-allowed' : 'hover:bg-mineiro-clay'}`}
              >
                <Plus className="w-4 h-4" />
                Novo Produto
              </button>
            )}
          </div>
        </header>

        <div className="p-8 space-y-8">
          {activeTab === 'dashboard' && <AdminDashboard orders={orders} />}
          {activeTab === 'orders' && (
            <AdminOrders 
              orders={orders} 
              onStatusChange={handleStatusChange} 
              onViewDetails={setSelectedOrder} 
            />
          )}
          {activeTab === 'products' && (
            isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mineiro-brown"></div>
              </div>
            ) : (
              <AdminProducts 
                products={products} 
                onEdit={handleOpenEditModal} 
                onDelete={handleDeleteProduct} 
              />
            )
          )}
        </div>
      </main>

      {/* Product Creation/Edit Modal */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />

      {/* Delete Confirmation Modal */}
      {productToDelete !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl text-center">
            <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-red-500 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excluir Produto?</h3>
            <p className="text-gray-500 mb-8">Esta ação não pode ser desfeita. O prato será removido permanentemente do cardápio.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setProductToDelete(null)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
