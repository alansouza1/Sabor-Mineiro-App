import React from 'react';
import { X } from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserProfile;
  onSave: (data: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  userData,
  onSave
}) => {
  const [formData, setFormData] = React.useState<UserProfile>(userData);

  React.useEffect(() => {
    if (isOpen) {
      setFormData(userData);
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold">Editar Perfil</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nome</label>
            <input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 transition-all" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Telefone</label>
            <input 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 transition-all" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Endereço</label>
            <textarea 
              required
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-mineiro-brown/20 h-24 resize-none transition-all" 
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-mineiro-brown text-white py-4 rounded-2xl font-bold text-lg hover:bg-mineiro-clay transition-all shadow-lg shadow-mineiro-brown/20"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};
