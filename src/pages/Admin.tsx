import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Menu, X } from 'lucide-react';
import { ProductService } from '../services/api';
import { Product, Order } from '../types';
import { useOrders } from '../hooks/useOrders';
import { OrderDetailsModal } from '../components/common/OrderDetailsModal';
import { ProductFormModal } from '../components/admin/ProductFormModal';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      alert('Falha ao salvar produto.');
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

  const toggleTab = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-mineiro-brown text-white p-4 flex items-center justify-between sticky top-0 z-[60] shadow-md">
        <h1 className="text-lg font-serif font-bold">Sabor Mineiro</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/10 rounded-xl">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Content */}
      <div className={`md:hidden fixed top-0 left-0 bottom-0 w-72 bg-mineiro-brown z-[80] transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <AdminSidebar 
          activeTab={activeTab} 
          onTabChange={toggleTab} 
          isDemo={!!isDemo} 
          onLogout={handleLogout} 
        />
      </div>

      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden md:flex w-64 sticky top-0 h-screen overflow-y-auto">
        <AdminSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isDemo={!!isDemo} 
          onLogout={handleLogout} 
        />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <AdminHeader 
          activeTab={activeTab} 
          onAddProduct={handleOpenCreateModal} 
          isDemo={!!isDemo} 
        />

        <div className="p-4 md:p-8 space-y-6 md:space-y-8 overflow-x-hidden">
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

      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />

      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />

      {/* Delete Confirmation Modal */}
      {productToDelete !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl text-center">
            <div className="bg-red-50 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
              <AlertCircle className="text-red-500 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Excluir Produto?</h3>
            <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setProductToDelete(null)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 text-sm"
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
