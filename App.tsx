import React, { useState, useEffect } from 'react';
import { 
  Rocket, ShoppingCart, Menu, Search, X, MapPin, 
  Settings, LogOut, Plus, Minus, Trash2, 
  AlertTriangle, DollarSign, ChevronRight, FileText
} from 'lucide-react';
import * as Storage from './constants.ts';
import * as Constants from './constants';
import { Product, Category, CartItem, Order, Neighborhood, CashClose } from './types';

// --- SUB-COMPONENTS (DEFINED OUTSIDE TO PREVENT RE-RENDERS) ---

// 1. Header
const Header = ({ 
  cartCount, 
  onOpenCart, 
  onGoHome, 
  onOpenAdmin,
  logo,
  headerImage
}: { 
  cartCount: number, 
  onOpenCart: () => void, 
  onGoHome: () => void,
  onOpenAdmin: () => void,
  logo: string | null,
  headerImage: string | null
}) => {
  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        {headerImage ? (
          <img src={headerImage} alt="Header Background" className="w-full h-full object-cover opacity-60 blur-[1px]" />
        ) : (
          <div className="w-full h-full bg-space-900" />
        )}
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center text-center pt-6 pb-4">
        
        {/* Logo Image */}
        <div className="mb-2 cursor-pointer transition-transform hover:scale-105 active:scale-95" onClick={onGoHome}>
          {logo ? (
            <img src={logo} alt="Logo" className="w-24 h-24 rounded-full object-cover border-2 border-alien-500 shadow-[0_0_20px_rgba(57,255,20,0.6)]" />
          ) : (
             <div className="w-20 h-20 rounded-full bg-black/80 border-2 border-alien-500 flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.5)]">
               <Rocket className="text-alien-500 w-10 h-10" />
             </div>
          )}
        </div>

        {/* Text Titles */}
        <h1 className="text-3xl font-black text-alien-500 tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none mb-1">
          AREA51
        </h1>
        <h2 className="text-lg font-bold text-neonpink-500 tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-2">
          CONVENIÊNCIA & TABACARIA
        </h2>
        <p className="text-[11px] text-gray-200 font-medium max-w-xs leading-tight bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
          Rodovia Gabriel Arns 5346 (Saturno)<br/>Forquilhinha, SC
        </p>

        {/* Action Buttons (Floating or Row) */}
        <div className="flex gap-4 mt-4">
           <button 
             onClick={onOpenAdmin} 
             className="w-10 h-10 bg-black/60 backdrop-blur rounded-lg flex items-center justify-center border border-gray-600 text-gray-400 hover:text-white hover:border-alien-500 transition-colors"
           >
             <Settings className="w-5 h-5" />
           </button>
           <button 
             onClick={onOpenCart} 
             className="w-10 h-10 bg-black/60 backdrop-blur rounded-lg flex items-center justify-center border border-gray-600 text-alien-500 hover:bg-gray-800 hover:border-alien-500 transition-colors relative"
           >
             <ShoppingCart className="w-5 h-5" />
             {cartCount > 0 && (
               <span className="absolute -top-2 -right-2 bg-neonpink-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-black shadow-sm">
                 {cartCount}
               </span>
             )}
           </button>
        </div>
      </div>
      
      {/* Decorative Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-alien-500 to-transparent opacity-80 relative z-20"></div>
    </header>
  );
};

// 2. Spaceship Animation Overlay
const AbductionOverlay = ({ active, customImage }: { active: boolean, customImage: string | null }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md">
      <div className="relative animate-bounce">
        {customImage ? (
           <div className="relative">
             <img 
               src={customImage} 
               alt="Abduction" 
               className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_30px_rgba(57,255,20,0.6)] animate-pulse" 
             />
             {/* Optional beam effect under the custom image */}
             <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-32 h-64 bg-gradient-to-b from-alien-500/40 to-transparent animate-beam clip-path-beam blur-md"></div>
           </div>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-48 h-48 text-alien-500 drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]">
              <path d="M12 2C8 2 4 5 4 8C4 10 6 11.5 9 12.5V22H15V12.5C18 11.5 20 10 20 8C20 5 16 2 12 2Z" fill="#000" />
              <path d="M12 2C8 2 4 5 4 8C4 10 6 11.5 9 12.5V22H15V12.5C18 11.5 20 10 20 8C20 5 16 2 12 2Z" stroke="#39ff14" />
              <ellipse cx="12" cy="8" rx="3" ry="1.5" fill="#39ff14" />
            </svg>
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-24 h-64 bg-gradient-to-b from-alien-500/50 to-transparent animate-beam clip-path-beam"></div>
          </>
        )}
      </div>
      <h2 className="mt-8 text-2xl font-black text-alien-500 animate-pulse tracking-widest drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]">
        ABDUZINDO PEDIDO...
      </h2>
    </div>
  );
};

// 3. Home View
const HomeView = ({ 
  categories, 
  onSelectCategory 
}: { 
  categories: Category[], 
  onSelectCategory: (catId: string) => void 
}) => (
  <div className="p-4 space-y-4 pb-24">
    <div className="text-center mb-2">
       <h3 className="text-alien-500 font-bold text-lg uppercase tracking-wider">Escolha uma Categoria</h3>
    </div>
    
    {categories.map(cat => (
      <button 
        key={cat.id}
        onClick={() => onSelectCategory(cat.id)}
        className="w-full bg-gray-200 hover:bg-white active:scale-95 transition-all duration-200 rounded-xl p-5 flex items-center justify-between shadow-lg shadow-black/50 group border border-transparent hover:border-alien-500"
      >
        <span className="font-bold text-space-900 text-left text-sm md:text-base leading-tight pr-2">
          {cat.name}
        </span>
        <ChevronRight className="text-gray-500 w-5 h-5 flex-shrink-0 group-hover:text-alien-600" />
      </button>
    ))}
  </div>
);

// 4. Subcategory View
const SubcategoryView = ({
  selectedCategory,
  onBack,
  onSelectSubcategory
}: {
  selectedCategory: Category | null, // Received as derived prop
  onBack: () => void,
  onSelectSubcategory: (sub: string) => void
}) => {
  if (!selectedCategory) return null;
  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="p-2 bg-gray-800 rounded-lg text-white hover:text-alien-500 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-white leading-tight flex-1">
          {selectedCategory.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {selectedCategory.subcategories.map(sub => (
          <button
            key={sub}
            onClick={() => onSelectSubcategory(sub)}
            className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex justify-between items-center border border-gray-700 hover:border-alien-500 transition-all active:scale-95"
          >
            <span className="text-white font-medium">{sub}</span>
            <Rocket className="w-4 h-4 text-alien-500 transform rotate-45" />
          </button>
        ))}
        {selectedCategory.subcategories.length === 0 && (
          <p className="text-gray-500 text-center italic">Nenhuma subcategoria.</p>
        )}
      </div>
    </div>
  );
};

// 5. Products View
const ProductsView = ({
  products,
  selectedCategory,
  selectedSubcategory,
  onBack,
  onAddToCart
}: {
  products: Product[],
  selectedCategory: Category | null,
  selectedSubcategory: string,
  onBack: () => void,
  onAddToCart: (p: Product, option: 'unit' | 'case') => void
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filtered = products.filter(p => 
    p.category === selectedCategory?.name && 
    p.subcategory === selectedSubcategory &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} className="p-2 bg-gray-800 rounded-lg text-white hover:text-alien-500 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Buscar produto..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 pl-10 pr-3 text-sm text-white focus:border-alien-500 focus:outline-none placeholder-gray-500"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-alien-500 mb-4 px-1">{selectedSubcategory}</h3>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-gray-800/80 backdrop-blur rounded-xl p-3 flex gap-3 border border-gray-700 hover:border-alien-500/50 transition-colors">
            <img src={p.image} alt={p.name} className="w-24 h-24 object-cover rounded-lg bg-gray-900 border border-gray-600" />
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h4 className="font-bold text-white text-base leading-tight mb-1">{p.name}</h4>
                <p className="text-xs text-gray-400">{p.volume} • {p.description}</p>
              </div>
              
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-alien-500 font-bold text-lg">R$ {p.price.toFixed(2)}</span>
                  <button 
                    onClick={() => onAddToCart(p, 'unit')}
                    className="bg-alien-600 hover:bg-alien-500 active:bg-alien-700 text-black font-bold py-1.5 px-4 rounded-md text-sm transition-colors"
                  >
                    ADD
                  </button>
                </div>
                
                {/* Case Option Logic */}
                {(p.category.includes('CERVEJAS') || p.category.includes('TABACARIA')) && (
                  <div className="flex justify-between items-center border-t border-gray-700 pt-2 mt-1">
                    <span className="text-[10px] text-gray-400">
                      {p.category.includes('TABACARIA') ? 'Box (10)' : 'Caixa (12)'}: 
                      <span className="text-neonpink-500 font-bold ml-1 text-xs">
                        R$ {p.priceCase ? p.priceCase.toFixed(2) : (p.price * (p.category.includes('TABACARIA') ? 10 : 12)).toFixed(2)}
                      </span>
                    </span>
                    <button 
                      onClick={() => onAddToCart(p, 'case')}
                      className="bg-gray-700 hover:bg-gray-600 text-white text-[10px] py-1 px-2 rounded border border-gray-600"
                    >
                      + Box
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500 bg-gray-900/50 rounded-lg">
            <p>Nenhum produto encontrado nesta subcategoria.</p>
            <p className="text-xs mt-2">Verifique se o produto está cadastrado com a subcategoria exata: "{selectedSubcategory}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 6. Cart View
const CartView = ({
  cart,
  onClose,
  onRemove,
  onUpdateQuantity,
  onCheckout
}: {
  cart: CartItem[],
  onClose: () => void,
  onRemove: (id: string, opt: 'unit'|'case') => void,
  onUpdateQuantity: (id: string, opt: 'unit'|'case', d: number) => void,
  onCheckout: () => void
}) => {
  const subtotal = cart.reduce((acc, item) => {
    const price = item.selectedOption === 'case' ? (item.priceCase || item.price * 12) : item.price;
    return acc + (price * item.quantity);
  }, 0);

  const cigsTotal = cart
    .filter(item => item.category.includes('TABACARIA'))
    .reduce((acc, item) => {
      const price = item.selectedOption === 'case' ? (item.priceCase || 0) : item.price;
      return acc + (price * item.quantity);
    }, 0);
  const validTotalForMin = subtotal - cigsTotal;
  const canCheckout = validTotalForMin >= Constants.MIN_ORDER_VALUE;

  return (
    <div className="fixed inset-0 bg-space-900/95 backdrop-blur z-50 flex flex-col">
      <div className="p-4 bg-black/50 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-alien-500" /> Seu Carrinho
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
               <ShoppingCart className="w-10 h-10 opacity-30" />
            </div>
            <p className="text-lg">Carrinho vazio</p>
            <button onClick={onClose} className="mt-4 text-alien-500 hover:underline">
              Voltar ao menu
            </button>
          </div>
        ) : (
          cart.map((item, idx) => {
            const price = item.selectedOption === 'case' ? (item.priceCase || item.price * 12) : item.price;
            return (
              <div key={`${item.id}-${item.selectedOption}-${idx}`} className="flex gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-sm">
                <img src={item.image} className="w-16 h-16 object-cover rounded bg-black border border-gray-600" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-white line-clamp-2">{item.name}</h4>
                    <button onClick={() => onRemove(item.id, item.selectedOption)} className="text-red-500 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">
                    {item.selectedOption === 'case' 
                      ? (item.category.includes('TABACARIA') ? 'Box c/ 10' : 'Caixa c/ 12') 
                      : 'Unidade'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-alien-500 font-bold">R$ {(price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center gap-3 bg-gray-900 rounded px-2 py-1 border border-gray-700">
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedOption, -1)} className="text-gray-400 hover:text-white">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.selectedOption, 1)} className="text-gray-400 hover:text-white">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cart.length > 0 && (
        <div className="bg-black/80 backdrop-blur p-4 border-t border-gray-800">
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span className="font-bold text-white">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="text-right text-[10px] text-gray-400 italic">
               *Taxa de entrega será calculada na finalização
            </div>
            {!canCheckout && (
               <div className="bg-red-500/10 border border-red-500/30 p-2 rounded text-red-400 text-xs flex items-start gap-2">
                 <AlertTriangle className="w-4 h-4 shrink-0" />
                 <span>Pedido mínimo de R$ {Constants.MIN_ORDER_VALUE.toFixed(2)} em produtos (exceto cigarros). Faltam R$ {(Constants.MIN_ORDER_VALUE - validTotalForMin).toFixed(2)}.</span>
               </div>
            )}
          </div>
          <button 
            disabled={!canCheckout}
            onClick={onCheckout}
            className={`w-full py-3 rounded-xl font-bold text-center uppercase tracking-wide transition-all ${
              canCheckout 
              ? 'bg-alien-600 hover:bg-alien-500 text-black shadow-[0_0_15px_rgba(57,255,20,0.4)]' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirmar Pedido
          </button>
        </div>
      )}
    </div>
  );
};

// 7. Checkout View
const CheckoutView = ({
  cart,
  neighborhoods,
  onBack,
  onFinish
}: {
  cart: CartItem[],
  neighborhoods: Neighborhood[],
  onBack: () => void,
  onFinish: (orderData: any) => void
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState({ street: '', number: '', neighborhood: '', reference: '' });
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'money' | 'card'>('pix');
  const [changeFor, setChangeFor] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);

  const subtotal = cart.reduce((acc, item) => {
    const price = item.selectedOption === 'case' ? (item.priceCase || item.price * 12) : item.price;
    return acc + (price * item.quantity);
  }, 0);
  
  const deliveryFee = deliveryType === 'delivery' ? (selectedNeighborhood?.price || 0) : 0;
  const total = subtotal + deliveryFee;

  // Group neighborhoods by city for better UX
  const groupedNeighborhoods = neighborhoods.reduce((acc, curr) => {
    const city = curr.city || 'Outros';
    if (!acc[city]) acc[city] = [];
    acc[city].push(curr);
    return acc;
  }, {} as Record<string, Neighborhood[]>);

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = neighborhoods.find(n => n.name === e.target.value);
    setSelectedNeighborhood(found || null);
    if (found) {
        setAddress({...address, neighborhood: found.name});
    }
  };

  const handleFinish = () => {
    if (!name) return alert('Digite seu nome');
    if (deliveryType === 'delivery' && (!selectedNeighborhood || !address.street || !address.number)) {
      return alert('Preencha o endereço completo');
    }

    onFinish({
      name, phone, deliveryType, address, selectedNeighborhood, paymentMethod, changeFor, total
    });
  };

  return (
    <div className="fixed inset-0 bg-space-900 z-50 flex flex-col overflow-y-auto">
       <div className="p-4 border-b border-gray-800 flex items-center gap-2 bg-black/50">
          <button onClick={onBack} className="text-gray-400 hover:text-white"><X className="w-6 h-6"/></button>
          <h2 className="font-bold text-xl">Finalizar Pedido</h2>
       </div>

       <div className="p-4 space-y-6 pb-20">
          <div className="flex bg-gray-800 p-1 rounded-lg">
            <button 
              onClick={() => setDeliveryType('delivery')}
              className={`flex-1 py-2 rounded-md font-bold text-sm transition-colors ${deliveryType === 'delivery' ? 'bg-alien-600 text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Entrega
            </button>
            <button 
              onClick={() => setDeliveryType('pickup')}
              className={`flex-1 py-2 rounded-md font-bold text-sm transition-colors ${deliveryType === 'pickup' ? 'bg-alien-600 text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Retirada
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-alien-500 font-bold uppercase text-xs tracking-wider border-b border-gray-800 pb-1">Seus Dados</h3>
            <input type="text" placeholder="Seu Nome (Obrigatório)" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-alien-500 outline-none text-white placeholder-gray-500" />
            <input type="tel" placeholder="Telefone (Opcional)" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-alien-500 outline-none text-white placeholder-gray-500" />
          </div>

          {deliveryType === 'delivery' && (
            <div className="space-y-3">
              <h3 className="text-alien-500 font-bold uppercase text-xs tracking-wider border-b border-gray-800 pb-1">Endereço de Entrega</h3>
              <select 
                className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-alien-500 outline-none text-white"
                onChange={handleNeighborhoodChange}
                value={selectedNeighborhood?.name || ''}
              >
                <option value="">Selecione o Bairro</option>
                {Object.entries(groupedNeighborhoods).map(([city, hoods]) => (
                  <optgroup key={city} label={city} className="bg-space-900 font-bold text-alien-600">
                    {hoods.sort((a,b) => a.name.localeCompare(b.name)).map(n => (
                      <option key={n.name} value={n.name} className="text-white">
                        {n.name} - R$ {n.price.toFixed(2)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="flex gap-2">
                <input type="text" placeholder="Rua" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="flex-1 bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-alien-500 outline-none text-white placeholder-gray-500" />
                <input type="text" placeholder="Nº" value={address.number} onChange={e => setAddress({...address, number: e.target.value})} className="w-24 bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-alien-500 outline-none text-white placeholder-gray-500" />
              </div>
              <input type="text" placeholder="Complemento / Ponto de Referência" value={address.reference} onChange={e => setAddress({...address, reference: e.target.value})} className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-alien-500 outline-none text-white placeholder-gray-500" />
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-alien-500 font-bold uppercase text-xs tracking-wider border-b border-gray-800 pb-1">Forma de Pagamento</h3>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setPaymentMethod('pix')} className={`p-3 rounded-lg border font-medium text-sm transition-colors ${paymentMethod === 'pix' ? 'border-alien-500 bg-alien-500/10 text-alien-500' : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Pix</button>
              <button onClick={() => setPaymentMethod('money')} className={`p-3 rounded-lg border font-medium text-sm transition-colors ${paymentMethod === 'money' ? 'border-alien-500 bg-alien-500/10 text-alien-500' : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Dinheiro</button>
              <button onClick={() => setPaymentMethod('card')} className={`p-3 rounded-lg border font-medium text-sm transition-colors ${paymentMethod === 'card' ? 'border-alien-500 bg-alien-500/10 text-alien-500' : 'border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>Cartão</button>
            </div>
            {paymentMethod === 'money' && (
              <input type="text" placeholder="Precisa de troco para quanto?" value={changeFor} onChange={e => setChangeFor(e.target.value)} className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700 focus:border-alien-500 outline-none text-white placeholder-gray-500 animate-fadeIn" />
            )}
          </div>

          <div className="bg-gray-800/80 p-5 rounded-xl border border-gray-700 shadow-lg">
            <div className="flex justify-between text-sm mb-2">
               <span className="text-gray-400">Subtotal</span>
               <span className="text-white">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-4">
               <span>Taxa de Entrega</span>
               <span>R$ {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-alien-500 border-t border-gray-600 pt-3">
               <span>TOTAL A PAGAR</span>
               <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handleFinish}
            className="w-full bg-alien-600 hover:bg-alien-500 active:bg-alien-700 text-black font-black py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-all transform hover:-translate-y-1"
          >
            <Rocket className="w-6 h-6" /> ENVIAR PEDIDO
          </button>
       </div>
    </div>
  );
};

// 8. Admin View
const AdminView = ({
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  onClose,
  products, setProducts,
  categories, setCategories,
  orders, setOrders,
  neighborhoods, setNeighborhoods,
  cashCloses, setCashCloses,
  logo, setLogo,
  headerImage, setHeaderImage,
  animationImage, setAnimationImage
}: any) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'settings' | 'inventory' | 'cash'>('products');
  
  // Admin Sub-States
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newPass, setNewPass] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [inventorySearch, setInventorySearch] = useState('');
  const [newNeighborhood, setNewNeighborhood] = useState<Neighborhood>({ city: '', name: '', price: 0 });
  
  // Cash Close State
  const [cashCloseData, setCashCloseData] = useState({
      money: 0, card: 0, pix: 0, initial: 0, final: 0, notes: ''
  });

  const handleLogin = () => {
    if (passwordInput === Storage.getAdminPassword()) {
      setIsAdminLoggedIn(true);
    } else {
      alert('Acesso negado');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'product' | 'header' | 'animation') => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await Storage.fileToBase64(e.target.files[0]);
        if (type === 'logo') {
          setLogo(base64);
          Storage.saveLogo(base64);
          alert('Logo atualizado!');
        } else if (type === 'header') {
          setHeaderImage(base64);
          Storage.saveHeaderImage(base64);
          alert('Capa atualizada!');
        } else if (type === 'animation') {
          setAnimationImage(base64);
          Storage.saveAnimationImage(base64);
          alert('Animação atualizada!');
        } else if (type === 'product' && editingProduct) {
          setEditingProduct({...editingProduct, image: base64});
        }
      } catch (err) {
        alert('Erro ao carregar imagem');
      }
    }
  };

  const saveProduct = () => {
    if (!editingProduct) return;
    if (!editingProduct.subcategory) {
        alert("Selecione uma subcategoria");
        return;
    }

    let newProds;
    if (products.find((p: Product) => p.id === editingProduct.id)) {
      newProds = products.map((p: Product) => p.id === editingProduct.id ? editingProduct : p);
    } else {
      newProds = [...products, editingProduct];
    }
    setProducts(newProds);
    Storage.saveProducts(newProds);
    setEditingProduct(null);
  };

  const deleteProduct = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    // If we are deleting the product currently being edited, close the form
    if (editingProduct && editingProduct.id === id) {
      setEditingProduct(null);
    }

    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      const newProds = products.filter((p: Product) => p.id !== id);
      setProducts(newProds);
      Storage.saveProducts(newProds);
    }
  };
  
  const performCashClose = () => {
      const close: CashClose = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          totalCard: cashCloseData.card,
          totalCash: cashCloseData.money,
          totalPix: cashCloseData.pix,
          initialFloat: cashCloseData.initial,
          finalFloat: cashCloseData.final,
          notes: cashCloseData.notes
      };
      Storage.saveCashClose(close);
      setCashCloses([close, ...cashCloses]);
      alert('Caixa Fechado!');
      setCashCloseData({ money: 0, card: 0, pix: 0, initial: 0, final: 0, notes: '' });
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCat: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      subcategories: []
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    Storage.saveCategories(updated);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Excluir categoria? Isso ocultará produtos vinculados.')) {
      const updated = categories.filter((c: Category) => c.id !== id);
      setCategories(updated);
      Storage.saveCategories(updated);
    }
  };

  const handleAddSubcategory = (catId: string) => {
    const input = document.getElementById(`sub-input-${catId}`) as HTMLInputElement;
    if (!input || !input.value.trim()) return;
    
    const val = input.value.trim();
    const updated = categories.map((c: Category) => {
      if (c.id === catId) {
        if (c.subcategories.includes(val)) return c;
        return { ...c, subcategories: [...c.subcategories, val] };
      }
      return c;
    });
    setCategories(updated);
    Storage.saveCategories(updated);
    input.value = '';
  };

  const handleDeleteSubcategory = (catId: string, sub: string) => {
      const updated = categories.map((c: Category) => {
          if (c.id === catId) {
              return { ...c, subcategories: c.subcategories.filter(s => s !== sub) };
          }
          return c;
      });
      setCategories(updated);
      Storage.saveCategories(updated);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Excluir este pedido do histórico?')) {
      const updated = Storage.deleteOrder(orderId);
      setOrders(updated);
    }
  };

  const updateStock = (productId: string, newStock: number) => {
    const updated = products.map((p: Product) => p.id === productId ? { ...p, stock: newStock } : p);
    setProducts(updated);
    Storage.saveProducts(updated);
  };

  const handleAddNeighborhood = () => {
    if (!newNeighborhood.name || !newNeighborhood.city) return alert('Preencha nome e cidade');
    const updated = [...neighborhoods, newNeighborhood];
    setNeighborhoods(updated);
    Storage.saveNeighborhoods(updated);
    setNewNeighborhood({ city: '', name: '', price: 0 });
  };

  const handleDeleteNeighborhood = (name: string) => {
     if (confirm('Remover bairro?')) {
       const updated = neighborhoods.filter((n: Neighborhood) => n.name !== name);
       setNeighborhoods(updated);
       Storage.saveNeighborhoods(updated);
     }
  };

  // Helper to get subcategories for currently editing product
  const getSubcategoriesForEditing = () => {
    if (!editingProduct) return [];
    const cat = categories.find((c: Category) => c.name === editingProduct.category);
    return cat ? cat.subcategories : [];
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
        <div className="bg-space-800 p-8 rounded-xl border border-alien-500/50 w-full max-w-sm shadow-[0_0_30px_rgba(57,255,20,0.1)]">
          <h2 className="text-2xl font-bold text-center text-alien-500 mb-6 tracking-widest">ÁREA RESTRITA</h2>
          <input 
            type="password" 
            placeholder="Senha de Acesso"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            className="w-full bg-space-900 border border-gray-600 p-4 rounded-lg mb-4 text-center tracking-widest text-xl focus:border-alien-500 outline-none text-white"
          />
          <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors">Voltar</button>
              <button onClick={handleLogin} className="flex-1 bg-alien-600 hover:bg-alien-500 text-black font-bold py-3 rounded-lg transition-colors">Entrar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-space-900 flex flex-col overflow-hidden">
      <div className="bg-black/80 border-b border-gray-800 p-4 flex justify-between items-center">
        <h2 className="text-alien-500 font-bold flex items-center gap-2"><Settings /> ADMINISTRAÇÃO</h2>
        <button onClick={() => { setIsAdminLoggedIn(false); onClose(); }} className="text-gray-400 hover:text-red-500"><LogOut /></button>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-16 md:w-64 bg-space-900 border-r border-gray-800 flex flex-col gap-2 p-2 overflow-y-auto">
          {[
            { id: 'products', label: 'Produtos', icon: Rocket },
            { id: 'categories', label: 'Categorias', icon: Menu },
            { id: 'orders', label: 'Pedidos', icon: FileText },
            { id: 'inventory', label: 'Inventário', icon: AlertTriangle },
            { id: 'cash', label: 'Caixa', icon: DollarSign },
            { id: 'settings', label: 'Configurações', icon: Settings },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === item.id ? 'bg-alien-600 text-black shadow-[0_0_10px_rgba(57,255,20,0.3)]' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:block font-semibold">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-black/20 p-4 overflow-y-auto">
          {activeTab === 'products' && (
            <div>
              <button 
                type="button"
                onClick={() => setEditingProduct({
                  id: Date.now().toString(), name: '', price: 0, description: '', category: categories[0]?.name || '',
                  subcategory: categories[0]?.subcategories[0] || '', image: '', volume: '', isPromo: false, stock: 0, unitType: 'unit'
                })}
                className="bg-alien-600 text-black px-4 py-2 rounded-lg font-bold mb-4 flex items-center gap-2 shadow-lg hover:bg-alien-500 transition-colors"
              >
                <Plus className="w-4 h-4" /> Novo Produto
              </button>

              {editingProduct && (
                 <div className="bg-space-800 p-6 rounded-xl mb-4 border border-alien-500/30 shadow-2xl">
                   <h3 className="font-bold mb-4 text-alien-500 text-lg">Editar Produto</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input className="input-admin" placeholder="Nome do Produto" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                     <input className="input-admin" placeholder="Preço Unitário" type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                     <input className="input-admin" placeholder="Preço Caixa/Box (Opcional)" type="number" value={editingProduct.priceCase || ''} onChange={e => setEditingProduct({...editingProduct, priceCase: parseFloat(e.target.value)})} />
                     <input className="input-admin" placeholder="Volume (Ex: 350ml, 1L)" value={editingProduct.volume} onChange={e => setEditingProduct({...editingProduct, volume: e.target.value})} />
                     
                     {/* Category Selector */}
                     <select 
                        className="input-admin" 
                        value={editingProduct.category} 
                        onChange={e => {
                          // Reset subcategory when category changes to avoid mismatch
                          const newCat = categories.find((c: Category) => c.name === e.target.value);
                          setEditingProduct({
                              ...editingProduct, 
                              category: e.target.value,
                              subcategory: newCat?.subcategories[0] || ''
                          });
                        }}
                     >
                        {categories.map((c: Category) => <option key={c.id} value={c.name}>{c.name}</option>)}
                     </select>
                     
                     {/* Subcategory Selector (Dropdown) */}
                     <select 
                        className="input-admin" 
                        value={editingProduct.subcategory} 
                        onChange={e => setEditingProduct({...editingProduct, subcategory: e.target.value})}
                     >
                        <option value="">Selecione Subcategoria</option>
                        {getSubcategoriesForEditing().map(sub => (
                           <option key={sub} value={sub}>{sub}</option>
                        ))}
                     </select>

                     <div className="col-span-full border border-gray-700 rounded p-3 border-dashed">
                        <label className="block text-xs text-gray-400 mb-2">Imagem do Produto</label>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'product')} className="text-xs text-gray-400" />
                        {editingProduct.image && <img src={editingProduct.image} className="h-32 mt-2 rounded-lg object-contain bg-black/50" />}
                     </div>
                   </div>
                   <div className="flex gap-3 mt-6">
                     <button type="button" onClick={saveProduct} className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg transition-colors">Salvar Produto</button>
                     <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-2 rounded-lg transition-colors">Cancelar</button>
                   </div>
                 </div>
              )}

              <h3 className="text-alien-500 font-bold mb-2 mt-6 border-b border-gray-700 pb-2">Produtos Cadastrados ({products.length})</h3>
              <div className="space-y-2">
                {products.map((p: Product) => (
                  <div key={p.id} className="bg-space-800 p-3 rounded-lg flex justify-between items-center border border-gray-700 hover:border-gray-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-12 h-12 rounded-md object-cover bg-black" />
                      <div>
                        <p className="font-bold text-white">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.category.substring(0, 20)}... / {p.subcategory}</p>
                        <p className="text-xs text-alien-500">R$ {p.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setEditingProduct(p)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded"><Settings className="w-5 h-5" /></button>
                      <button 
                        type="button" 
                        onClick={(e) => deleteProduct(e, p.id)} 
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded border border-transparent hover:border-red-500/30 transition-all z-10"
                        title="Excluir Produto"
                      >
                        <Trash2 className="w-5 h-5 pointer-events-none" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'categories' && (
            <div className="space-y-6">
               <div className="bg-space-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-bold text-alien-500 mb-2">Adicionar Nova Categoria</h3>
                  <div className="flex gap-2">
                     <input 
                       className="input-admin" 
                       placeholder="Nome da Categoria (Ex: 7- Doces)" 
                       value={newCategoryName}
                       onChange={e => setNewCategoryName(e.target.value)}
                     />
                     <button type="button" onClick={handleAddCategory} className="bg-alien-600 text-black font-bold px-4 rounded hover:bg-alien-500">
                       <Plus />
                     </button>
                  </div>
               </div>

               <div className="space-y-4">
                  {categories.map((cat: Category) => (
                    <div key={cat.id} className="bg-space-800 p-4 rounded-lg border border-gray-700">
                       <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                          <h4 className="font-bold text-white text-lg">{cat.name}</h4>
                          <button type="button" onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-400"><Trash2 /></button>
                       </div>
                       
                       <div className="pl-4">
                          <h5 className="text-xs text-gray-400 uppercase font-bold mb-2">Subcategorias</h5>
                          <div className="flex flex-wrap gap-2 mb-3">
                             {cat.subcategories.map(sub => (
                               <span key={sub} className="bg-black/50 border border-gray-600 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                 {sub}
                                 <button type="button" onClick={() => handleDeleteSubcategory(cat.id, sub)} className="text-red-500 hover:text-red-400 font-bold">×</button>
                               </span>
                             ))}
                          </div>
                          <div className="flex gap-2">
                             <input 
                               className="input-admin py-1 text-sm" 
                               placeholder="Nova Subcategoria" 
                               id={`sub-input-${cat.id}`}
                             />
                             <button type="button" onClick={() => handleAddSubcategory(cat.id)} className="bg-gray-700 hover:bg-gray-600 px-3 rounded text-white text-sm">Adicionar</button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-4">
               <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <input 
                      className="input-admin pl-10" 
                      placeholder="Buscar produto no estoque..." 
                      value={inventorySearch}
                      onChange={e => setInventorySearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  </div>
               </div>

               <div className="overflow-x-auto rounded-lg border border-gray-700">
                 <table className="w-full text-sm text-left text-gray-400">
                   <thead className="bg-space-900 text-gray-200 uppercase text-xs">
                     <tr>
                       <th className="p-3">Produto</th>
                       <th className="p-3 text-center">Estoque Atual</th>
                       <th className="p-3 text-right">Ação</th>
                     </tr>
                   </thead>
                   <tbody className="bg-space-800">
                     {products
                       .filter((p: Product) => p.name.toLowerCase().includes(inventorySearch.toLowerCase()))
                       .map((p: Product) => (
                       <tr key={p.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                         <td className="p-3 font-medium text-white">{p.name}</td>
                         <td className="p-3 text-center">
                            <span className={`px-2 py-1 rounded font-bold ${p.stock < 10 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                              {p.stock}
                            </span>
                         </td>
                         <td className="p-3 flex justify-end gap-2">
                            <button type="button" onClick={() => updateStock(p.id, Math.max(0, p.stock - 1))} className="p-1 bg-gray-700 rounded hover:bg-gray-600"><Minus className="w-4 h-4" /></button>
                            <button type="button" onClick={() => updateStock(p.id, p.stock + 1)} className="p-1 bg-gray-700 rounded hover:bg-gray-600"><Plus className="w-4 h-4" /></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}

          {activeTab === 'cash' && (
              <div className="space-y-6">
                  <div className="bg-space-800 p-6 rounded-lg border border-gray-700">
                      <h3 className="text-xl font-bold text-alien-500 mb-4">Fechamento de Caixa</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs text-gray-400">Total Dinheiro</label>
                              <input type="number" className="input-admin" value={cashCloseData.money} onChange={e => setCashCloseData({...cashCloseData, money: parseFloat(e.target.value)})} />
                          </div>
                          <div>
                              <label className="text-xs text-gray-400">Total Cartão</label>
                              <input type="number" className="input-admin" value={cashCloseData.card} onChange={e => setCashCloseData({...cashCloseData, card: parseFloat(e.target.value)})} />
                          </div>
                          <div>
                              <label className="text-xs text-gray-400">Total Pix</label>
                              <input type="number" className="input-admin" value={cashCloseData.pix} onChange={e => setCashCloseData({...cashCloseData, pix: parseFloat(e.target.value)})} />
                          </div>
                           <div>
                              <label className="text-xs text-gray-400">Fundo Inicial</label>
                              <input type="number" className="input-admin" value={cashCloseData.initial} onChange={e => setCashCloseData({...cashCloseData, initial: parseFloat(e.target.value)})} />
                          </div>
                           <div>
                              <label className="text-xs text-gray-400">Fundo Final (Troco)</label>
                              <input type="number" className="input-admin" value={cashCloseData.final} onChange={e => setCashCloseData({...cashCloseData, final: parseFloat(e.target.value)})} />
                          </div>
                          <div className="col-span-full">
                              <label className="text-xs text-gray-400">Notas/Observações</label>
                              <textarea className="input-admin" rows={3} value={cashCloseData.notes} onChange={e => setCashCloseData({...cashCloseData, notes: e.target.value})}></textarea>
                          </div>
                      </div>
                      <button type="button" onClick={performCashClose} className="mt-4 bg-alien-600 text-black font-bold py-3 px-6 rounded-lg hover:bg-alien-500 w-full md:w-auto transition-colors shadow-lg">FECHAR CAIXA</button>
                  </div>

                  <div>
                      <h3 className="text-lg font-bold mb-2 text-white">Histórico</h3>
                       <div className="overflow-x-auto rounded-lg border border-gray-700">
                          <table className="w-full text-sm text-left text-gray-400">
                              <thead className="bg-space-900 text-gray-200 uppercase text-xs">
                                  <tr>
                                      <th className="p-3">Data</th>
                                      <th className="p-3">Dinheiro</th>
                                      <th className="p-3">Pix</th>
                                      <th className="p-3">Cartão</th>
                                      <th className="p-3">Total</th>
                                  </tr>
                              </thead>
                              <tbody className="bg-space-800">
                                  {cashCloses.map((c: CashClose) => (
                                      <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                          <td className="p-3">{new Date(c.date).toLocaleString()}</td>
                                          <td className="p-3">R$ {c.totalCash.toFixed(2)}</td>
                                          <td className="p-3">R$ {c.totalPix.toFixed(2)}</td>
                                          <td className="p-3">R$ {c.totalCard.toFixed(2)}</td>
                                          <td className="p-3 text-alien-500 font-bold">R$ {(c.totalCash + c.totalPix + c.totalCard).toFixed(2)}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                       </div>
                  </div>
              </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
               <h3 className="font-bold text-alien-500">Pedidos Recentes</h3>
               {orders.map((o: Order) => (
                 <div key={o.id} className="bg-space-800 p-4 rounded-lg border border-gray-700 hover:border-alien-500/30 transition-colors">
                   <div className="flex justify-between mb-2">
                     <span className="font-bold text-white">{o.customerName}</span>
                     <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{new Date(o.date).toLocaleString()}</span>
                        <button type="button" onClick={() => handleDeleteOrder(o.id)} className="text-red-500 hover:text-red-300 p-1"><Trash2 className="w-4 h-4" /></button>
                     </div>
                   </div>
                   <p className="text-sm text-gray-300 mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> {o.address}</p>
                   <div className="bg-space-900 p-2 rounded text-xs text-gray-400 mb-2 border border-gray-800">
                     {o.items.map((i, idx) => (
                       <div key={idx} className="flex justify-between">
                          <span>{i.quantity}x {i.name} ({i.selectedOption})</span>
                       </div>
                     ))}
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-alien-500 font-bold">Total: R$ {o.total.toFixed(2)}</span>
                     <span className={`text-xs px-2 py-1 rounded border uppercase font-bold ${o.deliveryType === 'delivery' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-orange-500/20 text-orange-400 border-orange-500/50'}`}>{o.deliveryType === 'delivery' ? 'Entrega' : 'Retirada'}</span>
                   </div>
                 </div>
               ))}
               {orders.length === 0 && <p className="text-gray-500">Nenhum pedido recente.</p>}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div className="bg-space-800 p-5 rounded-lg border border-gray-700">
                <h3 className="font-bold mb-4 text-white">Alterar Senha Admin</h3>
                <div className="flex gap-2">
                  <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Nova senha" className="input-admin" />
                  <button type="button" onClick={() => {Storage.setAdminPassword(newPass); alert('Senha alterada'); setNewPass('')}} className="bg-alien-600 text-black font-bold px-4 rounded-lg">Salvar</button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-space-800 p-5 rounded-lg border border-gray-700">
                  <h3 className="font-bold mb-4 text-white">Logo do App</h3>
                  <div className="border border-dashed border-gray-600 rounded-lg p-4 text-center">
                      <input type="file" onChange={(e) => handleFileUpload(e, 'logo')} className="text-sm text-gray-400 mx-auto" />
                      {logo && <img src={logo} className="mt-4 w-32 h-32 object-contain bg-black rounded-lg mx-auto border border-alien-500" />}
                  </div>
                </div>

                <div className="bg-space-800 p-5 rounded-lg border border-gray-700">
                  <h3 className="font-bold mb-4 text-white">Imagem de Fundo (Capa)</h3>
                  <div className="border border-dashed border-gray-600 rounded-lg p-4 text-center">
                      <input type="file" onChange={(e) => handleFileUpload(e, 'header')} className="text-sm text-gray-400 mx-auto" />
                      {headerImage && <img src={headerImage} className="mt-4 w-full h-32 object-cover bg-black rounded-lg mx-auto border border-alien-500" />}
                  </div>
                </div>

                <div className="bg-space-800 p-5 rounded-lg border border-gray-700 md:col-span-2">
                  <h3 className="font-bold mb-4 text-white">Imagem da Animação (Abdução)</h3>
                  <p className="text-xs text-gray-400 mb-2">Aparece ao finalizar o pedido.</p>
                  <div className="border border-dashed border-gray-600 rounded-lg p-4 text-center">
                      <input type="file" onChange={(e) => handleFileUpload(e, 'animation')} className="text-sm text-gray-400 mx-auto" />
                      {animationImage && <img src={animationImage} className="mt-4 w-32 h-32 object-contain bg-black rounded-lg mx-auto border border-alien-500" />}
                  </div>
                </div>
              </div>

              <div className="bg-space-800 p-5 rounded-lg border border-gray-700">
                <h3 className="font-bold mb-4 text-alien-500">Gerenciar Bairros e Taxas</h3>
                
                <div className="flex flex-col md:flex-row gap-2 mb-4">
                   <input className="input-admin" placeholder="Cidade" value={newNeighborhood.city} onChange={e => setNewNeighborhood({...newNeighborhood, city: e.target.value})} />
                   <input className="input-admin" placeholder="Nome do Bairro" value={newNeighborhood.name} onChange={e => setNewNeighborhood({...newNeighborhood, name: e.target.value})} />
                   <input 
                     className="input-admin" 
                     type="number" 
                     placeholder="Taxa (R$)" 
                     value={newNeighborhood.price === 0 ? '' : newNeighborhood.price} 
                     onChange={e => setNewNeighborhood({...newNeighborhood, price: parseFloat(e.target.value) || 0})} 
                   />
                   <button type="button" onClick={handleAddNeighborhood} className="bg-green-600 text-white font-bold px-4 py-2 rounded">Adicionar</button>
                </div>

                <div className="max-h-60 overflow-y-auto border border-gray-700 rounded-lg">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-black text-gray-400 text-xs uppercase sticky top-0">
                       <tr>
                         <th className="p-2">Cidade</th>
                         <th className="p-2">Bairro</th>
                         <th className="p-2">Taxa</th>
                         <th className="p-2"></th>
                       </tr>
                     </thead>
                     <tbody>
                       {neighborhoods.map((n: Neighborhood, i: number) => (
                         <tr key={`${n.city}-${n.name}-${i}`} className="border-b border-gray-700 hover:bg-gray-700/50">
                           <td className="p-2 text-gray-400">{n.city}</td>
                           <td className="p-2 text-white">{n.name}</td>
                           <td className="p-2 text-alien-500 font-bold">R$ {n.price.toFixed(2)}</td>
                           <td className="p-2 text-right">
                             <button type="button" onClick={() => handleDeleteNeighborhood(n.name)} className="text-red-500 hover:text-white"><Trash2 className="w-4 h-4"/></button>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP LOGIC ---

export default function App() {
  // State
  const [view, setView] = useState<'home' | 'subcategory' | 'products' | 'cart' | 'admin' | 'checkout' | 'internal'>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // CHANGED: Use ID instead of full object to prevent stale data
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  
  const [logo, setLogo] = useState<string | null>(null);
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [animationImage, setAnimationImage] = useState<string | null>(null);
  
  // Admin State & Data
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cashCloses, setCashCloses] = useState<CashClose[]>([]);
  
  // Animation State
  const [isAbducting, setIsAbducting] = useState(false);

  // Derived State: Always get the fresh category object from the list
  const activeCategory = categories.find(c => c.id === selectedCategoryId) || null;

  // Init
  useEffect(() => {
    setProducts(Storage.getProducts());
    setCategories(Storage.getCategories());
    setNeighborhoods(Storage.getNeighborhoods());
    setLogo(Storage.getLogo());
    setHeaderImage(Storage.getHeaderImage());
    setAnimationImage(Storage.getAnimationImage());
  }, []);

  // Safety: If active category is deleted, go home
  useEffect(() => {
    if (view === 'subcategory' && !activeCategory) {
      setView('home');
    }
  }, [categories, view, activeCategory]);

  // Admin Data Init
  useEffect(() => {
    if (isAdminLoggedIn) {
      setOrders(Storage.getOrders());
      setCashCloses(Storage.getCashCloses());
      setNeighborhoods(Storage.getNeighborhoods());
    }
  }, [isAdminLoggedIn]);

  const addToCart = (product: Product, option: 'unit' | 'case') => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedOption === option);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedOption === option
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedOption: option }];
    });
  };

  const removeFromCart = (itemId: string, option: 'unit' | 'case') => {
    setCart(prev => prev.filter(item => !(item.id === itemId && item.selectedOption === option)));
  };

  const updateQuantity = (itemId: string, option: 'unit' | 'case', delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId && item.selectedOption === option) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleCheckoutFinish = (orderData: any) => {
      setIsAbducting(true);

      // Save Order
      const newOrder: Order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        customerName: orderData.name,
        address: orderData.deliveryType === 'pickup' ? 'Retirada' : `${orderData.address.street}, ${orderData.address.number} - ${orderData.selectedNeighborhood?.name} (${orderData.selectedNeighborhood?.city})`,
        items: cart,
        total: orderData.total,
        paymentMethod: orderData.paymentMethod,
        status: 'pending',
        deliveryType: orderData.deliveryType
      };
      Storage.saveOrder(newOrder);

      // WhatsApp Message
      let msg = `*NOVO PEDIDO - ÁREA 51*\n`;
      msg += `--------------------------------\n`;
      msg += `*Cliente:* ${orderData.name}\n`;
      if (orderData.phone) msg += `*Tel:* ${orderData.phone}\n`;
      msg += `*Tipo:* ${orderData.deliveryType === 'delivery' ? 'Entrega 🛵' : 'Retirada 🏪'}\n`;
      if (orderData.deliveryType === 'delivery') {
        msg += `*Endereço:* ${orderData.address.street}, ${orderData.address.number}\n`;
        msg += `*Bairro:* ${orderData.selectedNeighborhood?.name} (${orderData.selectedNeighborhood?.city})\n`;
        msg += `*Ref:* ${orderData.address.reference || '-'}\n`;
      }
      msg += `--------------------------------\n`;
      cart.forEach(item => {
        const qtyStr = item.selectedOption === 'case' 
          ? `[CX ${item.category.includes('TABACARIA') ? '10' : '12'}]` 
          : `[UN]`;
        msg += `${item.quantity}x ${item.name} ${qtyStr}\n`;
      });
      msg += `--------------------------------\n`;
      msg += `Subtotal: R$ ${(orderData.total - (orderData.deliveryType === 'delivery' ? orderData.selectedNeighborhood?.price || 0 : 0)).toFixed(2)}\n`;
      if (orderData.deliveryType === 'delivery') msg += `Taxa: R$ ${orderData.selectedNeighborhood?.price.toFixed(2)}\n`;
      msg += `*TOTAL: R$ ${orderData.total.toFixed(2)}*\n`;
      msg += `*Pagamento:* ${orderData.paymentMethod.toUpperCase()}`;
      if (orderData.paymentMethod === 'money' && orderData.changeFor) msg += ` (Troco para ${orderData.changeFor})`;

      // Delay for animation
      setTimeout(() => {
        window.open(`https://wa.me/554898159292?text=${encodeURIComponent(msg)}`, '_blank');
        setCart([]);
        setIsAbducting(false);
        setView('home');
      }, 3000);
  };

  return (
    <div className="min-h-screen text-white pb-10">
      <style>{`
        .input-admin { width: 100%; background: #1a1a2e; border: 1px solid #374151; padding: 0.75rem; border-radius: 0.5rem; color: white; outline: none; transition: border-color 0.2s; }
        .input-admin:focus { border-color: #39ff14; }
      `}</style>
      
      <AbductionOverlay active={isAbducting} customImage={animationImage} />

      <Header 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        onOpenCart={() => setView('cart')} 
        onGoHome={() => setView('home')}
        onOpenAdmin={() => setView('admin')}
        logo={logo}
        headerImage={headerImage}
      />
      
      <main className="container mx-auto max-w-2xl mt-4">
        {view === 'home' && (
          <HomeView 
            categories={categories}
            onSelectCategory={(catId) => {
              setSelectedCategoryId(catId);
              setView('subcategory');
            }}
          />
        )}

        {view === 'subcategory' && (
          <SubcategoryView
             selectedCategory={activeCategory}
             onBack={() => setView('home')}
             onSelectSubcategory={(sub) => {
               setSelectedSubcategory(sub);
               setView('products');
             }}
          />
        )}

        {view === 'products' && (
          <ProductsView
             products={products}
             selectedCategory={activeCategory}
             selectedSubcategory={selectedSubcategory}
             onBack={() => setView('subcategory')}
             onAddToCart={addToCart}
          />
        )}

        {view === 'cart' && (
          <CartView 
             cart={cart}
             onClose={() => setView('home')}
             onRemove={removeFromCart}
             onUpdateQuantity={updateQuantity}
             onCheckout={() => setView('checkout')}
          />
        )}

        {view === 'checkout' && (
          <CheckoutView
             cart={cart}
             neighborhoods={neighborhoods}
             onBack={() => setView('cart')}
             onFinish={handleCheckoutFinish}
          />
        )}
      </main>

      {/* ADMIN VIEW MOVED OUTSIDE MAIN FOR PROPER LAYOUT & Z-INDEX */}
      {view === 'admin' && (
          <AdminView
             isAdminLoggedIn={isAdminLoggedIn}
             setIsAdminLoggedIn={setIsAdminLoggedIn}
             onClose={() => setView('home')}
             products={products} setProducts={setProducts}
             categories={categories} setCategories={setCategories}
             orders={orders} setOrders={setOrders}
             neighborhoods={neighborhoods} setNeighborhoods={setNeighborhoods}
             cashCloses={cashCloses} setCashCloses={setCashCloses}
             logo={logo} setLogo={setLogo}
             headerImage={headerImage} setHeaderImage={setHeaderImage}
             animationImage={animationImage} setAnimationImage={setAnimationImage}
          />
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/554898159292" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-[0_0_20px_rgba(0,255,0,0.5)] z-40 transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
           <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 2.135.911 3.347.911 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.765-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-2.846-.828-.73-.3-1.41-1.019-1.91-1.519-.498-.5-.969-1.293-.969-2.092 0-.873.465-1.48.905-1.928.163-.165.373-.254.602-.254.172 0 .341.01.445.03.119.023.166.055.239.227.276.655.489 1.159.532 1.25.045.097.075.21.015.331-.06.121-.092.193-.18.298-.092.108-.194.24-.275.322-.093.095-.19.198-.083.385.109.189.483.784 1.037 1.278.711.633 1.309.832 1.493.924.185.092.296.082.406-.045.109-.126.471-.546.598-.733.126-.188.252-.157.42-.095.17.062 1.077.509 1.263.6.186.092.311.136.356.213.045.077.045.446-.099.851z"/>
        </svg>
      </a>
    </div>
  );
}