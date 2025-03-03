'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { RootState } from '@/redux/store';
import { fetchProducts, setLimit, setOffset } from '@/redux/actions/productActions';
import ProductCard from '@/components/product/ProductCard';

export default function ShopPage() {
  const dispatch = useDispatch();
  const { 
    productList, 
    total, 
    limit, 
    offset, 
    fetchState 
  } = useSelector((state: RootState) => state.product);
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Toplam sayfa sayısı
  const totalPages = Math.ceil(total / limit);
  // Mevcut sayfa
  const currentPage = Math.floor(offset / limit) + 1;
  
  useEffect(() => {
    // @ts-ignore (Redux Thunk tiplemesi için)
    dispatch(fetchProducts({ limit, offset }));
  }, [dispatch, limit, offset]);
  
  // Sayfa değiştirme
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const newOffset = (page - 1) * limit;
    dispatch(setOffset(newOffset));
  };
  
  // Limit değiştirme
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value);
    dispatch(setLimit(newLimit));
    dispatch(setOffset(0)); // Sayfa değiştiğinde offset'i sıfırla
  };
  
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
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>200 - 500 TL</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>500 TL ve üzeri</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Cinsiyet</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Kadın</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Erkek</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Unisex</span>
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
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>200 - 500 TL</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>500 TL ve üzeri</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Cinsiyet</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Kadın</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Erkek</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Unisex</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {/* Ürün Sayısı ve Sıralama */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <p className="text-gray-600 mb-4 md:mb-0">
                Toplam <span className="font-medium">{total}</span> ürün
              </p>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sayfa başına:</span>
                  <select 
                    className="border rounded p-1 text-sm"
                    value={limit}
                    onChange={handleLimitChange}
                  >
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                  </select>
                </label>
              </div>
            </div>
            
            {/* Ürün Listesi */}
            {fetchState === 'FETCHING' ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
              </div>
            ) : fetchState === 'FAILED' ? (
              <div className="text-center py-12">
                <p className="text-red-500">Ürünler yüklenirken bir hata oluştu.</p>
              </div>
            ) : productList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Ürün bulunamadı.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productList.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={product.price}
                    image={product.image || '/images/product-placeholder.jpg'}
                    category={product.category?.name}
                    discountPercentage={product.discountPercentage}
                  />
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {/* Sayfa numaraları */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Sayfa numaralarını hesapla
                    let pageNum;
                    if (totalPages <= 5) {
                      // 5 veya daha az sayfa varsa, tüm sayfaları göster
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      // Başlangıçtaysa, ilk 5 sayfayı göster
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // Sondaysa, son 5 sayfayı göster
                      pageNum = totalPages - 4 + i;
                    } else {
                      // Ortadaysa, mevcut sayfanın etrafındaki sayfaları göster
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-md ${
                          currentPage === pageNum
                            ? 'bg-[#23A6F0] text-white'
                            : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 