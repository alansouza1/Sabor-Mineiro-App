import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, CreditCard, CheckCircle2, ArrowRight, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';

const checkoutSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
  address: z.string().min(10, 'Endereço muito curto'),
  paymentMethod: z.enum(['pix', 'credit_card', 'cash'])
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'pix'
    }
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (cartCount === 0) return;

    setIsSubmitting(true);
    try {
      await addOrder({
        items: cart,
        total: cartTotal,
        customer: data,
        paymentMethod: data.paymentMethod
      });
      clearCart();
      navigate('/success');
    } catch (error) {
      console.error('Order processing failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-mineiro-cream/20 p-8 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-mineiro-brown opacity-20" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Carrinho vazio</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-mineiro-brown text-white px-8 py-3 rounded-2xl font-bold"
        >
          Voltar ao Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-mineiro-brown" />
          </button>
          <h1 className="text-xl font-bold">Finalizar Pedido</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 max-w-3xl mx-auto w-full p-4 space-y-6 pb-32">
        {/* Customer Info */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-mineiro-brown/10 p-2 rounded-xl">
              <User className="w-5 h-5 text-mineiro-brown" />
            </div>
            <h2 className="text-lg font-bold">Identificação</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nome Completo</label>
              <input 
                {...register('name')}
                className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-3 px-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none`}
                placeholder="Seu nome"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Telefone</label>
              <input 
                {...register('phone')}
                className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-3 px-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none`}
                placeholder="(31) 99999-9999"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone.message}</p>}
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-mineiro-brown/10 p-2 rounded-xl">
              <MapPin className="w-5 h-5 text-mineiro-brown" />
            </div>
            <h2 className="text-lg font-bold">Endereço de Entrega</h2>
          </div>
          <input 
            {...register('address')}
            className={`w-full bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-3 px-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none`}
            placeholder="Rua, número, bairro e complemento"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address.message}</p>}
        </section>

        {/* Payment */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-mineiro-brown/10 p-2 rounded-xl">
              <CreditCard className="w-5 h-5 text-mineiro-brown" />
            </div>
            <h2 className="text-lg font-bold">Forma de Pagamento</h2>
          </div>
          <div className="space-y-3">
            {(['pix', 'credit_card', 'cash'] as const).map((method) => (
              <label key={method} className="flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all border-gray-200 hover:border-mineiro-brown/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {method === 'pix' ? <span className="text-[10px] font-bold text-blue-600">PIX</span> : <CreditCard className="w-5 h-5 text-gray-600" />}
                  </div>
                  <span className="font-medium capitalize">
                    {method === 'pix' ? 'PIX' : method === 'credit_card' ? 'Cartão de Crédito' : 'Dinheiro'}
                  </span>
                </div>
                <input 
                  type="radio" 
                  {...register('paymentMethod')}
                  value={method}
                  className="w-5 h-5 accent-mineiro-brown" 
                />
              </label>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.quantity}x {item.name}</span>
                <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
              <span>Total</span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-20">
          <div className="max-w-3xl mx-auto">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-mineiro-brown text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-mineiro-clay transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
              {!isSubmitting && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};
