import Link from 'next/link';
import { useState } from 'react';

interface CartSummaryProps {
  totalPrice: number;
  selectedItemCount: number;
}

// Fiyat formatı
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2
  }).format(price);
};

export default function CartSummary({ totalPrice, selectedItemCount }: CartSummaryProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  
  // Kargo ücreti
  const shippingCost = 29.99;
  const freeShippingThreshold = 150;
  
  // Kargo indirimi (150 TL üzeri kargo bedava)
  const shippingDiscount = totalPrice >= freeShippingThreshold ? shippingCost : 0;
  
  // Kupon indirimi (örnek olarak)
  const couponDiscount = isDiscountApplied ? 20 : 0;
  
  // Toplam tutar
  const finalTotal = totalPrice + shippingCost - shippingDiscount - couponDiscount;
  
  // İndirim kodu uygulama
  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setIsDiscountApplied(true);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6">Sipariş Özeti</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Ürünlerin Toplamı</span>
          <span className="font-medium">{formatPrice(totalPrice)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Kargo Toplam</span>
          <span className="font-medium">{formatPrice(shippingCost)}</span>
        </div>
        
        {shippingDiscount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Kargo İndirimi</span>
            <span>-{formatPrice(shippingDiscount)}</span>
          </div>
        )}
        
        {isDiscountApplied && (
          <div className="flex justify-between items-center text-green-600">
            <span>Kupon İndirimi</span>
            <span>-{formatPrice(couponDiscount)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center font-bold text-lg">
            <span>Toplam</span>
            <span className="text-[#F27A1A]">{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>
      
      {/* İndirim Kodu Alanı */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="İndirim kodu"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0] text-sm"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button 
            onClick={handleApplyDiscount}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
          >
            Uygula
          </button>
        </div>
      </div>
      
      {/* Sepeti Onayla Butonu */}
      <Link 
        href="/checkout"
        className={`w-full py-3 rounded-md text-center text-white font-medium ${
          selectedItemCount > 0 
            ? 'bg-[#23A6F0] hover:bg-[#1a7ac0]' 
            : 'bg-gray-300 cursor-not-allowed'
        } flex items-center justify-center`}
        onClick={(e) => selectedItemCount === 0 && e.preventDefault()}
      >
        Sepeti Onayla
        <span className="ml-2">›</span>
      </Link>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        Siparişi tamamlayarak, <Link href="/terms" className="text-[#23A6F0]">Kullanım Koşulları</Link>nı kabul etmiş olursunuz.
      </div>
    </div>
  );
} 