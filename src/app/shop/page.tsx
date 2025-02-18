'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

// Örnek ürün verisi güncellendi
const products = [
  {
    id: '1',
    title: 'Basic Tişört',
    price: 199.99,
    image: '/images/ryan-hoffman-6Nub980bI3I-unsplash.jpg',
    category: 'Kadın'
  },
  {
    id: '2',
    title: 'Basic Tişört - Siyah',
    price: 199.99,
    image: '/images/ryan-hoffman-6Nub980bI3I-unsplash.jpg',
    category: 'Kadın'
  },
  {
    id: '3',
    title: 'Basic Tişört - Beyaz',
    price: 199.99,
    image: '/images/ryan-hoffman-6Nub980bI3I-unsplash.jpg',
    category: 'Kadın'
  },
  {
    id: '4',
    title: 'Basic Tişört - Gri',
    price: 199.99,
    image: '/images/ryan-hoffman-6Nub980bI3I-unsplash.jpg',
    category: 'Kadın'
  }
];

export default function ShopPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="flex flex-col pt-20">
      {/* Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">Mağaza</h1>
          <p className="mt-2 text-gray-600">En yeni ürünleri keşfedin</p>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden sticky top-20 bg-white z-40 border-b">
        <button
          className="w-full px-4 py-3 flex items-center justify-between text-gray-700"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtrele</span>
          </div>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold mb-4">Kategoriler</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Kadın</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Erkek</span>
                </label>
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-semibold mb-4">Fiyat Aralığı</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>0 - 100 TL</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>100 - 200 TL</span>
                </label>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {isMobileFilterOpen && (
            <div className="md:hidden border-b pb-4">
              {/* Mobile filter content */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Kategoriler</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Kadın</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Erkek</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 