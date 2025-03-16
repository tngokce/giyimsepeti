import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: {
    product: any;
    count: number;
    checked: boolean;
  };
  onRemove: (productId: number) => void;
  onUpdateCount: (productId: number, count: number) => void;
  onToggleItem: (productId: number) => void;
}

// Fiyat formatı
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2
  }).format(price);
};

export default function CartItem({ item, onRemove, onUpdateCount, onToggleItem }: CartItemProps) {
  return (
    <div className="p-4 flex items-center">
      {/* Checkbox */}
      <div className="mr-4">
        <input 
          type="checkbox" 
          checked={item.checked}
          onChange={() => onToggleItem(item.product.id)}
          className="form-checkbox h-5 w-5 text-[#23A6F0] rounded border-gray-300"
        />
      </div>
      
      {/* Ürün Bilgisi */}
      <div className="flex-1 flex items-center">
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
      
      {/* Fiyat */}
      <div className="text-sm font-medium text-gray-700 mx-4">
        {formatPrice(item.product.price)}
      </div>
      
      {/* Miktar */}
      <div className="flex items-center border border-gray-300 rounded mx-4">
        <button 
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
          onClick={() => onUpdateCount(item.product.id, Math.max(1, item.count - 1))}
          disabled={item.count <= 1}
        >
          -
        </button>
        <span className="w-10 text-center text-sm">{item.count}</span>
        <button 
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
          onClick={() => onUpdateCount(item.product.id, item.count + 1)}
        >
          +
        </button>
      </div>
      
      {/* Toplam Fiyat */}
      <div className="text-sm font-medium text-[#23A6F0] mx-4">
        {formatPrice(item.product.price * item.count)}
      </div>
      
      {/* Kaldır Butonu */}
      <button 
        className="text-gray-400 hover:text-red-500 ml-2"
        onClick={() => onRemove(item.product.id)}
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
} 