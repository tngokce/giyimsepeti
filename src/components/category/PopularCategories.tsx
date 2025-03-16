'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchCategories } from '@/redux/actions/productActions';
import CategoryCard from './CategoryCard';

export default function PopularCategories() {
  const dispatch = useDispatch();
  const { categories, fetchState } = useSelector((state: RootState) => state.product);
  
  useEffect(() => {
    if (fetchState === 'NOT_FETCHED') {
      // @ts-ignore (Redux Thunk tiplemesi için)
      dispatch(fetchCategories());
    }
  }, [dispatch, fetchState]);
  
  // Kategorileri rating'e göre sırala ve ilk 5'ini al
  const topCategories = [...categories]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);
  
  if (fetchState === 'FETCHING') {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Popüler Kategoriler</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
        </div>
      </div>
    );
  }
  
  if (fetchState === 'FAILED') {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Popüler Kategoriler</h2>
        <p className="text-center text-red-500">Kategoriler yüklenirken bir hata oluştu.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Popüler Kategoriler</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {topCategories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            gender={category.gender}
            image={category.image || '/images/category-placeholder.jpg'}
            rating={category.rating}
          />
        ))}
      </div>
    </div>
  );
} 