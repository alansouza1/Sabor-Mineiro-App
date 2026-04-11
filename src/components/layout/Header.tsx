import React from 'react';
import { UtensilsCrossed, ShoppingBag, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-mineiro-cream/30 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-mineiro-brown p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <UtensilsCrossed className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-mineiro-brown leading-none">Sabor Mineiro</h1>
            <p className="text-[10px] text-mineiro-clay font-medium uppercase tracking-widest">Culinária Regional</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            to="/admin" 
            className="p-2 text-gray-400 hover:text-mineiro-brown hover:bg-gray-50 rounded-full transition-all"
            title="Painel Administrativo"
          >
            <Settings className="w-6 h-6" />
          </Link>

          <Link 
            to="/profile" 
            className="p-2 text-gray-400 hover:text-mineiro-brown hover:bg-gray-50 rounded-full transition-all"
            title="Meu Perfil"
          >
            <User className="w-6 h-6" />
          </Link>

          <button 
            onClick={onOpenCart}
            className="relative p-2 text-mineiro-brown hover:bg-mineiro-cream/20 rounded-full transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-mineiro-green text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
