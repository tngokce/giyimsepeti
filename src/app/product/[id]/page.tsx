'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Minus, Plus } from 'lucide-react';

// Örnek ürün verisi - Gerçek uygulamada API'den gelecek
const product = {
  id: '1',
  title: 'Basic Tişört',
  price: 199.99,
  image: '/images/ryan-hoffman-6Nub980bI3I-unsplash.jpg',
  category: 'Kadın',
  description: 'Yüksek kaliteli pamuktan üretilmiş, rahat kesim basic tişört.',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['Beyaz', 'Siyah', 'Gri']
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <div className="flex flex-col pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
            </div>

            <p className="text-2xl font-bold text-gray-900">
              {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </p>

            <p className="text-gray-600">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Beden</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-[#23A6F0] text-[#23A6F0]'
                        : 'border-gray-200 text-gray-900 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Renk</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color
                        ? 'border-[#23A6F0] text-[#23A6F0]'
                        : 'border-gray-200 text-gray-900 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Adet</h3>
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 border rounded-md"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-gray-900 font-medium">{quantity}</span>
                <button
                  className="p-2 border rounded-md"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#23A6F0] text-white px-6 py-3 rounded-md hover:bg-[#1a7ac0] flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Sepete Ekle</span>
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Favorilere Ekle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 