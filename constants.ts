import { Category, Neighborhood, Product } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { 
    id: '1', 
    name: '1- ⚠️ PROMOÇÃO ⚠️', 
    subcategories: ['Cervejas', 'Destilados', 'Combos', 'Essências'] 
  },
  { 
    id: '2', 
    name: '2- TABACARIA (Narguilé, Seda, Piteira, Isqueiro, Essência, Carvão e Outros) 🔞', 
    subcategories: ['Cigarros', 'Sedas', 'Essências', 'Carvão', 'Narguilé', 'Isqueiros'] 
  },
  { 
    id: '3', 
    name: '3- CERVEJAS, ICE, SKOL BEATS e MANSÃO MAROMBA 👽', 
    subcategories: ['Lata', 'Long Neck', 'Garrafa 600ml', 'Litão', 'Barril'] 
  },
  { 
    id: '4', 
    name: '4- COMBOS (Whisky, Vodka e Gin) 🚀', 
    subcategories: ['Whisky', 'Vodka', 'Gin', 'Cachaça'] 
  },
  { 
    id: '5', 
    name: '5- NÃO ALCOÓLICOS (Refrigerante, Água, Energético, Suco) 🥤', 
    subcategories: ['Refrigerantes', 'Água', 'Energéticos', 'Sucos'] 
  },
  { 
    id: '6', 
    name: '6- PETISCOS E OUTROS 🥜', 
    subcategories: ['Salgadinhos', 'Chocolates', 'Amendoim', 'Gelo'] 
  },
];

export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_NEIGHBORHOODS: Neighborhood[] = [
  // FORQUILHINHA
  { city: 'Forquilhinha', name: 'Saturno', price: 2.00 },
  { city: 'Forquilhinha', name: 'Vila Franca', price: 2.50 },
  { city: 'Forquilhinha', name: 'Centro', price: 2.50 },
  { city: 'Forquilhinha', name: 'Clarissas', price: 3.00 },
  { city: 'Forquilhinha', name: 'Ouro Negro', price: 3.50 },
  { city: 'Forquilhinha', name: 'Nova Iorque', price: 3.50 },
  { city: 'Forquilhinha', name: 'Santa Clara', price: 3.50 },
  { city: 'Forquilhinha', name: 'Santa Ana', price: 3.75 },
  { city: 'Forquilhinha', name: 'Santa Isabel', price: 3.75 },
  { city: 'Forquilhinha', name: 'Vila Lourdes', price: 4.75 },
  { city: 'Forquilhinha', name: 'Santa Cruz', price: 6.00 },
  { city: 'Forquilhinha', name: 'Santa Libera', price: 6.00 },
  { city: 'Forquilhinha', name: 'Cidade Alta', price: 6.00 },
  { city: 'Forquilhinha', name: 'São Gabriel', price: 6.50 },
  { city: 'Forquilhinha', name: 'Vila Feltrin', price: 7.00 },
  { city: 'Forquilhinha', name: 'Santa Rosa', price: 7.50 },
  { city: 'Forquilhinha', name: 'Sanga do Café', price: 8.00 },
  { city: 'Forquilhinha', name: 'Santa Terezinha', price: 9.50 },
  { city: 'Forquilhinha', name: 'Sanga do Engenho', price: 10.00 },
  { city: 'Forquilhinha', name: 'Linha Eyng', price: 5.00 },
  // CRICÍUMA
  { city: 'Criciúma', name: 'São Roque', price: 6.00 },
  { city: 'Criciúma', name: 'Sangão', price: 7.00 },
  { city: 'Criciúma', name: 'Mãe Luzia', price: 7.50 },
  { city: 'Criciúma', name: 'São Defendê', price: 8.00 },
  { city: 'Criciúma', name: 'São Sebastião', price: 8.25 },
  { city: 'Criciúma', name: 'Vila Esperança', price: 8.75 },
  { city: 'Criciúma', name: 'Santa Luizia', price: 9.50 },
  { city: 'Criciúma', name: 'Verdinho', price: 10.00 },
  // NOVA VENEZA
  { city: 'Nova Veneza', name: 'Jardim Florencia', price: 7.50 },
  { city: 'Nova Veneza', name: 'São Bento Baixo', price: 9.50 },
  // MARACAJÁ
  { city: 'Maracajá', name: 'Prefeitura', price: 11.00 },
  { city: 'Maracajá', name: 'Mercado Stuart', price: 12.00 },
];

export const MIN_ORDER_VALUE = 20.00;
export const ADMIN_PASSWORD_DEFAULT = "0123509";