import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, MapPin, ChevronRight, Utensils, Package, Bike } from 'lucide-react';

export const Success: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    { 
      icon: Package, 
      label: 'Pedido Recebido', 
      description: 'Seu pedido foi recebido e está na fila.',
      time: '10:30', 
      status: 'completed' 
    },
    { 
      icon: Utensils, 
      label: 'Em Preparo', 
      description: 'O chef está preparando sua comida com carinho.',
      time: '10:35', 
      status: 'current' 
    },
    { 
      icon: Bike, 
      label: 'Saiu para Entrega', 
      description: 'O entregador já está a caminho do seu endereço.',
      time: '--:--', 
      status: 'pending' 
    },
    { 
      icon: MapPin, 
      label: 'Entregue', 
      description: 'Bom apetite! Não esqueça de nos avaliar.',
      time: '--:--', 
      status: 'pending' 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-lg mx-auto w-full p-6 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-green-100 p-6 rounded-full mb-8 shadow-inner"
        >
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h1>
          <p className="text-gray-500">Número do pedido: <span className="font-mono font-bold text-mineiro-brown">#84291</span></p>
        </motion.div>

        {/* Tracking Card */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-8 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status Atual</p>
              <h2 className="text-xl font-bold text-mineiro-brown">Em Preparo</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Previsão</p>
              <div className="flex items-center gap-2 text-mineiro-brown font-bold">
                <Clock className="w-4 h-4" />
                <span>25-35 min</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-0 relative"
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    step.status === 'completed' ? 'bg-green-500 text-white shadow-lg shadow-green-200' :
                    step.status === 'current' ? 'bg-mineiro-brown text-white shadow-lg shadow-mineiro-brown/30 animate-pulse' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  {index !== steps.length - 1 && (
                    <div className={`w-1 flex-1 my-2 rounded-full transition-colors duration-500 min-h-[40px] ${
                      step.status === 'completed' ? 'bg-green-500' : 'bg-gray-100'
                    }`} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-bold transition-colors ${
                        step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'
                      }`}>
                        {step.label}
                      </h3>
                      <p className={`text-sm mt-1 leading-relaxed ${
                        step.status === 'pending' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                      {step.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full space-y-3"
        >
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-mineiro-brown text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-mineiro-brown/20 hover:bg-mineiro-clay transition-all flex items-center justify-center gap-2"
          >
            Acompanhar no Mapa
            <Bike className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-white border border-gray-200 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            Voltar ao Menu
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </main>
    </div>
  );
};
