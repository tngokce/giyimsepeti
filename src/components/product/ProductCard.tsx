'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
  discountPercentage?: number;
}

export default function ProductCard({ 
  id, 
  title, 
  price, 
  image, 
  category, 
  discountPercentage 
}: ProductCardProps) {
  // Fiyat formatı
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  // İndirimli fiyat hesaplama
  const discountedPrice = discountPercentage 
    ? price - (price * discountPercentage / 100) 
    : null;
  
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
        {/* Ürün Resmi */}
        <Link href={`/product/${id}`}>
          <div className="relative h-full w-full">
            <Image
              src={image || '/images/product-placeholder.jpg'}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        
        {/* İndirim Etiketi */}
        {discountPercentage && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            %{discountPercentage} İndirim
          </div>
        )}
        
        {/* Aksiyon Butonları */}
        <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white text-gray-800 p-2 rounded-full shadow hover:bg-gray-100">
            <Heart className="w-5 h-5" />
          </button>
          <button className="bg-[#23A6F0] text-white p-2 rounded-full shadow hover:bg-[#1a7ac0]">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Ürün Bilgileri */}
      <div className="text-center">
        {category && (
          <p className="text-xs text-gray-500 mb-1">{category}</p>
        )}
        <Link href={`/product/${id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 hover:text-[#23A6F0] transition-colors mb-1 line-clamp-2">
            {title}
          </h3>
        </Link>
        <div className="flex justify-center items-center space-x-2">
          {discountedPrice ? (
            <>
              <span className="text-[#23A6F0] font-semibold">{formatPrice(discountedPrice)}</span>
              <span className="text-gray-400 text-sm line-through">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="text-[#23A6F0] font-semibold">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </div>
  );
} 