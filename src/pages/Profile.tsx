import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  MapPin, 
  CreditCard, 
  History, 
  ChevronRight, 
  LogOut, 
  Package,
  Heart,
  Banknote,
  Smartphone
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useOrders } from '../hooks/useOrders';
import { ProductService } from '../services/api';
import { OrderDetailsModal } from '../components/common/OrderDetailsModal';
import { EditProfileModal, UserProfile } from '../components/profile/EditProfileModal';
import { Order, Product } from '../types';
import { useAuth } from '../hooks/useAuth';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const { orders } = useOrders();
  const { user, logout } = useAuth();

  const [products, setProducts] = React.useState<Product[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products for favorites', error);
      }
    };
    fetchProducts();
  }, []);

  // Prioritize data from the last order, fallback to auth data
  const lastOrder = orders.length > 0 ? orders[0] : null;
  
  const userData: UserProfile & { paymentMethod: string } = {
    name: lastOrder?.customer.name || user?.name || 'Visitante',
    email: user?.email || '',
    phone: lastOrder?.customer.phone || '(31) 99999-9999',
    address: lastOrder?.customer.address || 'Endereço não cadastrado',
    paymentMethod: lastOrder?.customer.paymentMethod || 'cash'
  };

  const handleSaveProfile = (data: UserProfile) => {
    console.log('Save profile', data);
    setIsEditModalOpen(false);
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case 'pix': return 'PIX';
      case 'credit_card': return 'Cartão de Crédito';
      case 'cash': return 'Dinheiro';
      default: return 'Dinheiro';
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'pix': return <Smartphone className="w-5 h-5 text-gray-400" />;
      case 'credit_card': return <CreditCard className="w-5 h-5 text-gray-400" />;
      case 'cash': return <Banknote className="w-5 h-5 text-gray-400" />;
      default: return <Banknote className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-8">
        {/* Profile Header */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-mineiro-brown rounded-3xl flex items-center justify-center text-white text-3xl font-bold">
            {userData.name.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-500">{userData.email}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <Package className="w-4 h-4 text-mineiro-brown" />
                <span>{orders.length} Pedidos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{favorites.length} Favoritos</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Info */}
          <div className="lg:col-span-1 space-y-6">
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-mineiro-brown" />
                Dados Pessoais
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Telefone</p>
                  <p className="text-gray-900 font-medium">{userData.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Endereço Padrão</p>
                  <p className="text-gray-900 font-medium leading-relaxed">{userData.address}</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-mineiro-brown font-bold text-sm hover:underline"
                >
                  Editar Informações
                </button>
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-mineiro-brown" />
                Pagamento
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    {getPaymentIcon(userData.paymentMethod)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{getPaymentLabel(userData.paymentMethod)}</p>
                    <p className="text-xs text-gray-500">Última forma utilizada</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </section>
          </div>

          {/* Right Column: History & Favorites */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-mineiro-brown" />
                Últimos Pedidos
              </h2>
              <div className="space-y-4">
                {orders.length > 0 ? orders.map(order => (
                  <div 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:border-mineiro-brown/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-mineiro-brown/5 transition-colors">
                        <Package className="w-6 h-6 text-mineiro-brown" />
                      </div>
                      <div>
                        <p className="font-mono text-xs font-bold text-gray-400">{order.id.substring(0, 8)}...</p>
                        <p className="text-xs text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'} • {order.items.length} itens</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-mineiro-brown">R$ {order.total.toFixed(2)}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'Entregue' ? 'text-green-500' : 
                        order.status === 'Em produção' ? 'text-blue-500' : 
                        'text-amber-500'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-center py-8">Você ainda não realizou nenhum pedido.</p>
                )}
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Pratos Favoritos
              </h2>
              {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-2xl">
                      <img src={product.url_imagem} alt={product.nome} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{product.nome}</p>
                        <p className="text-xs text-mineiro-brown font-bold">R$ {product.preco.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Você ainda não favoritou nenhum prato.</p>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
};
