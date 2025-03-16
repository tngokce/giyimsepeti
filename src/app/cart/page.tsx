'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { 
  removeFromCart, 
  updateCartItem, 
  toggleCartItem, 
  clearCart 
} from '@/redux/actions/shoppingCartActions';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  const [allChecked, setAllChecked] = useState(false);
  
  // Sepetteki tüm ürünlerin toplam fiyatını hesapla
  const totalPrice = cart
    .filter(item => item.checked)
    .reduce((total, item) => total + (item.product.price * item.count), 0);
  
  // Seçili ürün sayısı
  const selectedItemCount = cart.filter(item => item.checked).length;
  
  // Tüm ürünlerin seçili olup olmadığını kontrol et
  useEffect(() => {
    if (cart.length > 0) {
      const allItemsChecked = cart.every(item => item.checked);
      setAllChecked(allItemsChecked);
    } else {
      setAllChecked(false);
    }
  }, [cart]);
  
  // Ürünü sepetten kaldır
  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };
  
  // Ürün miktarını güncelle
  const handleUpdateCount = (productId: number, count: number) => {
    dispatch(updateCartItem(productId, count));
  };
  
  // Ürün seçimini değiştir
  const handleToggleItem = (productId: number) => {
    dispatch(toggleCartItem(productId));
  };
  
  // Tüm ürünleri seçme/seçimini kaldırma
  const handleToggleAll = () => {
    // Eğer tüm ürünler seçiliyse, tüm seçimleri kaldır
    // Değilse, tüm ürünleri seç
    cart.forEach(item => {
      if ((allChecked && item.checked) || (!allChecked && !item.checked)) {
        dispatch(toggleCartItem(item.product.id));
      }
    });
  };
  
  // Sepeti temizle
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Alışveriş Sepeti</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-medium text-gray-600 mb-4">Sepetiniz boş</h2>
          <p className="text-gray-500 mb-6">Sepetinize ürün ekleyin ve alışverişe devam edin.</p>
          <Link 
            href="/shop" 
            className="inline-flex items-center px-6 py-3 bg-[#23A6F0] text-white rounded-md hover:bg-[#1a7ac0]"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={allChecked}
                    onChange={handleToggleAll}
                    className="form-checkbox h-5 w-5 text-[#23A6F0] rounded border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Tümünü Seç</span>
                </label>
                <button 
                  onClick={handleClearCart}
                  className="ml-auto text-gray-500 hover:text-red-500"
                >
                  Sepeti Temizle
                </button>
              </div>
              
              <div className="divide-y">
                {cart.map((item) => (
                  <CartItem 
                    key={item.product.id}
                    item={item}
                    onRemove={handleRemoveItem}
                    onUpdateCount={handleUpdateCount}
                    onToggleItem={handleToggleItem}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <CartSummary 
              totalPrice={totalPrice}
              selectedItemCount={selectedItemCount}
            />
          </div>
        </div>
      )}
    </div>
  );
} 