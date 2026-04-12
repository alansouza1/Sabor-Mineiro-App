import React from 'react';
import { UtensilsCrossed, ShoppingBag, Settings, User, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.roles.some(r => ['ROLE_ADMIN', 'ROLE_COZINHEIRO', 'ROLE_ATENDENTE', 'ROLE_DEMO'].includes(r));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="bg-mineiro-brown p-2 md:p-2.5 rounded-xl md:rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-mineiro-brown/20">
            <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-lg md:text-2xl font-serif font-black text-gray-900 tracking-tight">
            Sabor <span className="text-mineiro-brown">Mineiro</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <div className="flex items-center gap-1 md:gap-2">
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="p-2 md:p-3 text-gray-400 hover:text-mineiro-brown hover:bg-mineiro-cream/20 rounded-xl md:rounded-2xl transition-all"
                  title="Painel Administrativo"
                >
                  <Settings className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
              )}
              <Link 
                to="/profile" 
                className="p-2 md:p-3 text-gray-400 hover:text-mineiro-brown hover:bg-mineiro-cream/20 rounded-xl md:rounded-2xl transition-all"
                title="Meu Perfil"
              >
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              <button 
                onClick={handleLogout}
                className="hidden sm:flex p-2 md:p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl md:rounded-2xl transition-all"
                title="Sair"
              >
                <LogOut className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              state={{ from: location }}
              className="text-sm font-bold text-mineiro-brown hover:bg-mineiro-cream/20 px-4 py-2 rounded-xl transition-all"
            >
              Entrar
            </Link>
          )}

          <div className="w-px h-6 md:h-8 bg-gray-100 mx-1 md:mx-2" />

          <button 
            onClick={onOpenCart}
            className="relative p-2 md:p-3 bg-mineiro-cream/30 text-mineiro-brown rounded-xl md:rounded-2xl hover:bg-mineiro-cream/50 transition-all group"
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
