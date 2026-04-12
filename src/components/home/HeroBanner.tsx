import React from 'react';
import { Clock, MapPin } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="mb-8 relative overflow-hidden rounded-[2rem] bg-mineiro-brown aspect-[16/10] md:aspect-[21/9] min-h-[220px] flex items-center px-6 md:px-12 py-8 md:py-0">
      <img 
        src="https://picsum.photos/seed/mineiro-food/1200/600?blur=2" 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        alt="Fundo Mineiro"
        referrerPolicy="no-referrer"
      />
      <div className="relative z-10 max-w-lg">
        <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-serif font-bold leading-tight mb-2">O autêntico tempero de Minas</h2>
        <p className="text-mineiro-cream/80 text-xs sm:text-sm md:text-base mb-6 max-w-xs md:max-w-none">Receitas tradicionais passadas de geração em geração, agora na sua mesa.</p>
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
