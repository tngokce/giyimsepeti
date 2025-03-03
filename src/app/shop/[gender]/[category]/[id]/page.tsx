'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Filter } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import api from '@/lib/axios';

export default function CategoryPage() {
  const params = useParams();
  const { gender, category, id } = params;
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Burada gerçek API endpoint'inizi kullanın
        const response = await api.get(`/products?categoryId=${id}`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [id]);
  
  // Kategori adını ve cinsiyeti URL'den alıp formatlama
  const formattedCategory = typeof category === 'string' 
    ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : '';
  
  const formattedGender = typeof gender === 'string'
    ? gender.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : '';
  
  return (
    <div className="flex flex-col pt-20">
      {/* Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">{formattedGender} - {formattedCategory}</h1>
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
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="hidden md:block w-64 space-y-8">
            {/* Filter sections */}
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
                  <h3 className="font-semibold mb-2">Fiyat Aralığı</h3>
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
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Bu kategoride ürün bulunamadı.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={product.price}
                    image={product.image || '/images/product-placeholder.jpg'}
                    category={formattedCategory}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 