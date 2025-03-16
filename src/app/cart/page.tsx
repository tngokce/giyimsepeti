'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ChevronLeft, ShoppingCart, Check } from 'lucide-react';
import { RootState } from '@/redux/store';
import { removeFromCart, updateCartItem, toggleCartItem, clearCart } from '@/redux/actions/shoppingCartActions';

export default function CartPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  
  // Tüm ürünlerin seçili olup olmadığını kontrol et
  const allChecked = cart.length > 0 && cart.every(item => item.checked);
  
  // Seçili ürünlerin toplam fiyatı
  const totalPrice = cart.reduce(
    (total, item) => total + (item.checked ? item.product.price * item.count : 0), 
    0
  );
  
  // Seçili ürünlerin toplam sayısı
  const selectedItemsCount = cart.reduce(
    (total, item) => total + (item.checked ? item.count : 0), 
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
  
  // Ürünü sepetten kaldırma
  const handleRemoveItem = (productId: number) => {
    if (confirm('Bu ürünü sepetten çıkarmak istediğinize emin misiniz?')) {
      dispatch(removeFromCart(productId));
    }
  };
  
  // Ürün miktarını güncelleme
  const handleUpdateQuantity = (productId: number, newCount: number) => {
    if (newCount > 0) {
      dispatch(updateCartItem(productId, newCount));
    }
  };
  
  // Ürün seçimini değiştirme
  const handleToggleItem = (productId: number) => {
    dispatch(toggleCartItem(productId));
  };
  
  // Tüm ürünleri seçme/seçimini kaldırma
  const handleToggleAll = () => {
    // Eğer tüm ürünler seçiliyse, tüm seçimleri kaldır
    // Değilse, tüm ürünleri seç
    cart.forEach(item => {
      if (allChecked || !item.checked) {
        dispatch(toggleCartItem(item.product.id));
      }
    });
  };
  
  // Sepeti temizleme
  const handleClearCart = () => {
    if (confirm('Sepetinizi tamamen boşaltmak istediğinize emin misiniz?')) {
      dispatch(clearCart());
    }
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-2xl font-bold mb-6">Alışveriş Sepetim</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300" />
          </div>
          <h2 className="text-xl font-medium text-gray-600 mb-4">Sepetiniz boş</h2>
          <p className="text-gray-500 mb-6">Sepetinizde henüz ürün bulunmamaktadır.</p>
          <Link 
            href="/shop" 
            className="inline-flex items-center px-6 py-3 bg-[#23A6F0] text-white rounded-md hover:bg-[#1a7ac0]"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Alışverişe Devam Et
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sepet Tablosu */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Tablo Başlığı */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-600">
                <div className="col-span-1">
                  <button 
                    className={`w-5 h-5 rounded border ${
                      allChecked ? 'bg-[#23A6F0] border-[#23A6F0] text-white' : 'border-gray-300'
                    } flex items-center justify-center`}
                    onClick={handleToggleAll}
                  >
                    {allChecked && <Check className="w-3 h-3" />}
                  </button>
                </div>
                <div className="col-span-5">Ürün</div>
                <div className="col-span-2 text-center">Fiyat</div>
                <div className="col-span-2 text-center">Miktar</div>
                <div className="col-span-2 text-right">Toplam</div>
              </div>
              
              {/* Ürünler */}
              {cart.map((item) => (
                <div key={item.product.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                  {/* Seçim Kutusu */}
                  <div className="col-span-1">
                    <button 
                      className={`w-5 h-5 rounded border ${
                        item.checked ? 'bg-[#23A6F0] border-[#23A6F0] text-white' : 'border-gray-300'
                      } flex items-center justify-center`}
                      onClick={() => handleToggleItem(item.product.id)}
                    >
                      {item.checked && <Check className="w-3 h-3" />}
                    </button>
                  </div>
                  
                  {/* Ürün Bilgisi */}
                  <div className="col-span-5 flex items-center">
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                      <Image
                        src={item.product.images?.[0]?.url || '/images/product-placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link 
                        href={`/product/${item.product.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-[#23A6F0] line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.category && (
                        <p className="text-xs text-gray-500 mt-1">{item.product.category.name}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Birim Fiyat */}
                  <div className="col-span-2 text-center text-sm">
                    {formatPrice(item.product.price)}
                  </div>
                  
                  {/* Miktar */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                        disabled={item.count <= 1}
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm">{item.count}</span>
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Toplam Fiyat ve Kaldır Butonu */}
                  <div className="col-span-2 flex items-center justify-end">
                    <div className="text-sm font-medium text-[#23A6F0] mr-4">
                      {formatPrice(item.product.price * item.count)}
                    </div>
                    <button 
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => handleRemoveItem(item.product.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Alt Butonlar */}
              <div className="p-4 flex justify-between">
                <div className="flex space-x-4">
                  <Link 
                    href="/shop" 
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Alışverişe Devam Et
                  </Link>
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                    onClick={handleClearCart}
                  >
                    Sepeti Temizle
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sipariş Özeti */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Sipariş Özeti</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ürünün Toplamı</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kargo Toplam</span>
                  <span>29,99 TL</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
                  <span>-29,99 TL</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Toplam</span>
                  <span className="text-[#23A6F0]">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              {/* İndirim Kodu Alanı */}
              <div className="mb-6">
                <button className="w-full py-2 border border-gray-300 rounded-md text-sm flex items-center justify-center text-gray-600 hover:bg-gray-50">
                  <span className="mr-2">+</span>
                  İNDİRİM KODU GİR
                </button>
              </div>
              
              <Link 
                href="/checkout"
                className={`w-full py-3 rounded-md text-center text-white font-medium ${
                  selectedItemsCount > 0 
                    ? 'bg-[#F27A1A] hover:bg-[#e06c10]' 
                    : 'bg-gray-300 cursor-not-allowed'
                } flex items-center justify-center`}
                onClick={(e) => selectedItemsCount === 0 && e.preventDefault()}
              >
                Sepeti Onayla
                <span className="ml-2">›</span>
              </Link>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                Siparişi tamamlayarak, <Link href="/terms" className="text-[#23A6F0]">Kullanım Koşulları</Link>nı kabul etmiş olursunuz.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 