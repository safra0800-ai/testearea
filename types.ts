export interface Product {
  id: string;
  name: string;
  description: string;
  volume: string;
  price: number;
  priceCase?: number; // Price for 12 (beer) or 10 (cigs)
  image: string;
  category: string;
  subcategory: string;
  isPromo: boolean;
  stock: number;
  unitType: 'unit' | 'pack'; // Default unit type display
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedOption: 'unit' | 'case'; // Did user pick single or case?
}

export interface Neighborhood {
  name: string;
  price: number;
  city: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  address: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'cancelled';
  deliveryType: 'delivery' | 'pickup';
}

export interface InventoryLog {
  id: string;
  date: string;
  productId: string;
  productName: string;
  change: number;
  reason: string;
}

export interface CashClose {
  id: string;
  date: string;
  totalCash: number;
  totalCard: number;
  totalPix: number;
  initialFloat: number;
  finalFloat: number;
  notes: string;
}