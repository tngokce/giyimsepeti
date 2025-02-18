'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, title, price, image, category }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group relative flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-10">
          <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100">
              <Heart className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col">
        <Link href={`/product/${id}`} className="text-sm text-gray-500">
          {category}
        </Link>
        <Link href={`/product/${id}`} className="mt-1 text-sm font-medium text-gray-900">
          {title}
        </Link>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
        </p>
      </div>
    </Link>
  );
} 