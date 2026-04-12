export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  availableQuantity: number;
  needsProduction: boolean;
  category: 'Entradas' | 'Pratos Principais' | 'Bebidas' | 'Sobremesas';
}

export interface CartItem extends Product {
  quantity: number;
  observations?: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  observations?: string;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
}

export interface CreateOrderRequest {
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: CartItem[];
  total: number;
  paymentMethod: string;
}
