'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
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
              onClick={() => onPageChange(pageNum)}
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
} 