export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  url_imagem: string;
  qtd_disp: number;
  precisa_produzir: boolean;
  categoria: 'Entradas' | 'Pratos Principais' | 'Bebidas' | 'Sobremesas';
}

export interface CartItem extends Product {
  quantity: number;
  observations?: string;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivered';
  createdAt: string;
}
