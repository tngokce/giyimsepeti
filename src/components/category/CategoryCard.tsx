'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  id: number;
  name: string;
  gender: string;
  image: string;
  rating?: number;
}

export default function CategoryCard({ id, name, gender, image, rating }: CategoryCardProps) {
  // URL slug oluşturma - null/undefined kontrolü ekleyelim
  const slug = name ? name.toLowerCase().replace(/\s+/g, '-') : '';
  const genderSlug = gender ? gender.toLowerCase() : '';
  
  return (
    <Link 
      href={`/shop/${genderSlug}/${slug}/${id}`}
      className="group relative overflow-hidden rounded-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image || '/images/category-placeholder.jpg'}
          alt={name || 'Kategori'}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
          <div className="text-white">
            <h3 className="text-lg font-semibold">{name || 'Kategori'}</h3>
            {rating && (
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 