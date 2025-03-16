import Link from 'next/link';

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
  const shippingCost = 29.99;
  const freeShippingThreshold = 150;
  const shippingDiscount = totalPrice >= freeShippingThreshold ? shippingCost : 0;
  const finalTotal = totalPrice + shippingCost - shippingDiscount;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold mb-4">Sipariş Özeti</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Ürünün Toplamı</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Kargo Toplam</span>
          <span>{formatPrice(shippingCost)}</span>
        </div>
        {shippingDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
            <span>-{formatPrice(shippingDiscount)}</span>
          </div>
        )}
        <div className="border-t pt-3 flex justify-between font-bold">
          <span>Toplam</span>
          <span className="text-[#23A6F0]">{formatPrice(finalTotal)}</span>
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
          selectedItemCount > 0 
            ? 'bg-[#F27A1A] hover:bg-[#e06c10]' 
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