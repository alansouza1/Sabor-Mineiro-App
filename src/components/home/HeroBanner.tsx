import React from 'react';
import { Clock, MapPin } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="mb-8 relative overflow-hidden rounded-3xl bg-mineiro-brown aspect-[21/9] flex items-center px-8">
      <img 
        src="https://picsum.photos/seed/mineiro-food/1200/600?blur=2" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        alt="Fundo Mineiro"
        referrerPolicy="no-referrer"
      />
      <div className="relative z-10 max-w-lg">
        <h2 className="text-3xl md:text-5xl text-white mb-2">O autêntico tempero de Minas</h2>
        <p className="text-mineiro-cream/80 text-sm md:text-base mb-6">Receitas tradicionais passadas de geração em geração, agora na sua mesa.</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-white text-xs font-medium bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            30-45 min
          </div>
          <div className="flex items-center gap-1 text-white text-xs font-medium bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            Entrega Grátis
          </div>
        </div>
      </div>
    </section>
  );
}
