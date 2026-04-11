import React from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      <div className="relative">
        {/* Animated Background Circles */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 -m-8 bg-mineiro-brown rounded-full blur-2xl"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-mineiro-brown p-6 rounded-3xl shadow-2xl shadow-mineiro-brown/20"
        >
          <UtensilsCrossed className="text-white w-12 h-12" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <h2 className="text-2xl font-serif font-bold text-mineiro-brown mb-1">Sabor Mineiro</h2>
        <p className="text-mineiro-clay text-xs font-medium uppercase tracking-[0.2em]">Preparando o fogão...</p>
      </motion.div>

      {/* Loading Bar */}
      <div className="mt-8 w-48 h-1 bg-mineiro-cream/30 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full bg-mineiro-brown"
        />
      </div>
    </motion.div>
  );
};
