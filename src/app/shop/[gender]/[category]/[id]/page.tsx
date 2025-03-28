'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { fetchProducts, setLimit, setOffset, setFilter } from '@/redux/actions/productActions';
import ProductCard from '@/components/product/ProductCard';
import Pagination from '@/components/common/Pagination';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { gender, category, id } = params;
  const categoryId = typeof id === 'string' ? parseInt(id) : undefined;
  
  const { 
    productList, 
    total, 
    limit, 
    offset, 
    filter,
    fetchState 
  } = useSelector((state: RootState) => state.product);
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filterText, setFilterText] = useState(filter || '');
  const [sortOption, setSortOption] = useState('');
  
  // Toplam sayfa sayısı
  const totalPages = Math.ceil(total / limit);
  // Mevcut sayfa
  const currentPage = Math.floor(offset / limit) + 1;
  
  useEffect(() => {
    // Kategori değiştiğinde ürünleri getir
    if (categoryId) {
      // @ts-ignore (Redux Thunk tiplemesi için)
      dispatch(fetchProducts({ 
        limit, 
        offset, 
        categoryId,
        filter,
        sort: sortOption
      }));
    }
  }, [dispatch, limit, offset, categoryId, filter, sortOption]);
  
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
  
  // Filtre uygulama
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilter(filterText));
    dispatch(setOffset(0)); // Filtre değiştiğinde offset'i sıfırla
  };
  
  // Sıralama değiştirme
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    dispatch(setOffset(0)); // Sıralama değiştiğinde offset'i sıfırla
  };
  
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
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {/* Filtre ve Sıralama */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <p className="text-gray-600 mb-4 md:mb-0">
                Toplam <span className="font-medium">{total}</span> ürün
              </p>
              
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                {/* Filtre Formu */}
                <form onSubmit={handleFilterSubmit} className="flex w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    className="border rounded-l px-3 py-1.5 text-sm flex-1"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-[#23A6F0] text-white px-3 py-1.5 text-sm rounded-r"
                  >
                    Filtrele
                  </button>
                </form>
                
                {/* Sıralama */}
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <label className="text-sm text-gray-600 whitespace-nowrap">Sırala:</label>
                  <select 
                    className="border rounded px-3 py-1.5 text-sm flex-1"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="">Varsayılan</option>
                    <option value="price:asc">Fiyat: Düşükten Yükseğe</option>
                    <option value="price:desc">Fiyat: Yüksekten Düşüğe</option>
                    <option value="rating:asc">Puan: Düşükten Yükseğe</option>
                    <option value="rating:desc">Puan: Yüksekten Düşüğe</option>
                  </select>
                </div>
                
                {/* Sayfa Başına Ürün */}
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <label className="text-sm text-gray-600 whitespace-nowrap">Sayfa başına:</label>
                  <select 
                    className="border rounded px-3 py-1.5 text-sm"
                    value={limit}
                    onChange={handleLimitChange}
                  >
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                  </select>
                </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productList.map((product) => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    price={product.price}
                    imageUrl={product.image || '/images/product-placeholder.jpg'}
                    category={product.category?.name}
                    discount={product.discountPercentage}
                    rating={product.rating}
                  />
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 