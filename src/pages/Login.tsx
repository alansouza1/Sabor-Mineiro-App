import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, ArrowLeft, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@sabormineiro.com',
      password: 'admin123'
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      navigate('/admin');
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setLoginError('Email ou senha incorretos.');
      } else {
        setLoginError('Falha ao conectar com o servidor. Verifique se o backend está rodando.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAccess = async () => {
    setValue('email', 'demo@sabormineiro.com');
    setValue('password', 'demo123');
    const data = { email: 'demo@sabormineiro.com', password: 'demo123' };
    await onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-mineiro-brown mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a loja
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="bg-mineiro-brown w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Acesso Restrito</h1>
            <p className="text-gray-500">Entre com suas credenciais administrativas</p>
          </div>

          <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-900">Acesso para Recrutadores</h3>
                <p className="text-xs text-amber-700 mt-1 mb-3">Utilize o botão abaixo para entrar como um usuário de demonstração (somente visualização).</p>
                <button 

                  onClick={handleDemoAccess}
                  disabled={isSubmitting}
                  className="w-full bg-amber-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-amber-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "🔓 Acessar como Demo"}
                </button>
              </div>
            </div>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold">Ou via login</span></div>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  {...register('email')}
                  type="email"
                  className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none transition-all`}
                  placeholder="admin@sabormineiro.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  {...register('password')}
                  type="password"
                  className={`w-full bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-mineiro-brown/20 outline-none transition-all`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-mineiro-brown text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-mineiro-clay transition-all disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
