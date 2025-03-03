'use client';

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { RootState } from '@/redux/store';
import { removeFromCart, updateCartItem } from '@/redux/actions/shoppingCartActions';

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  
  // Toplam ürün sayısı
  const totalItems = cart.reduce((total, item) => total + item.count, 0);
  
  // Toplam fiyat
  const totalPrice = cart.reduce(
    (total, item) => total + (item.product.price * item.count), 
    0
  );
  
  // Fiyat formatı
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  // Dropdown dışına tıklandığında kapatma
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Ürünü sepetten kaldırma
  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };
  
  // Ürün miktarını güncelleme
  const handleUpdateQuantity = (productId: number, newCount: number) => {
    if (newCount > 0) {
      dispatch(updateCartItem(productId, newCount));
    }
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="relative p-2 text-gray-700 hover:text-[#23A6F0]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#23A6F0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Sepetim ({totalItems} Ürün)</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {cart.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Sepetinizde ürün bulunmamaktadır.
            </div>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-4 border-b flex">
                    {/* Ürün Resmi */}
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 mr-3">
                      <Image
                        src={item.product.images?.[0]?.url || '/images/product-placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Ürün Bilgileri */}
                    <div className="flex-1">
                      <Link 
                        href={`/product/${item.product.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-[#23A6F0] line-clamp-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.product.name}
                      </Link>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <button 
                            className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-l text-xs"
                            onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm">{item.count}</span>
                          <button 
                            className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-r text-xs"
                            onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-sm font-medium text-[#23A6F0]">
                          {formatPrice(item.product.price * item.count)}
                        </div>
                        
                        <button 
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Toplam:</span>
                  <span className="font-bold text-[#23A6F0]">{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    href="/cart"
                    className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md text-center text-sm hover:bg-gray-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Sepete Git
                  </Link>
                  <Link 
                    href="/checkout"
                    className="flex-1 bg-[#23A6F0] text-white py-2 px-4 rounded-md text-center text-sm hover:bg-[#1a7ac0]"
                    onClick={() => setIsOpen(false)}
                  >
                    Siparişi Tamamla
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 