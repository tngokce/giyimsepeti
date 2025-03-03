'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { RootState } from '@/redux/store';
import { fetchCategories } from '@/redux/actions/productActions';

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { categories, fetchState } = useSelector((state: RootState) => state.product);
  
  useEffect(() => {
    if (fetchState === 'NOT_FETCHED') {
      // @ts-ignore (Redux Thunk tiplemesi için)
      dispatch(fetchCategories());
    }
  }, [dispatch, fetchState]);
  
  // Kategorileri cinsiyete göre grupla
  const groupedCategories = categories.reduce((acc: any, category) => {
    const gender = category.gender || 'Diğer';
    if (!acc[gender]) {
      acc[gender] = [];
    }
    acc[gender].push(category);
    return acc;
  }, {});
  
  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Kategoriler</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
          {fetchState === 'FETCHING' ? (
            <div className="px-4 py-2 text-gray-500">Yükleniyor...</div>
          ) : Object.keys(groupedCategories).length > 0 ? (
            Object.entries(groupedCategories).map(([gender, cats]: [string, any]) => (
              <div key={gender} className="px-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">{gender}</h3>
                <div className="space-y-1">
                  {cats.map((category: any) => {
                    const slug = category.name ? category.name.toLowerCase().replace(/\s+/g, '-') : '';
                    const genderSlug = gender ? gender.toLowerCase() : '';
                    
                    return (
                      <Link
                        key={category.id}
                        href={`/shop/${genderSlug}/${slug}/${category.id}`}
                        className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name || 'Kategori'}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">Kategori bulunamadı</div>
          )}
        </div>
      )}
    </div>
  );
} 