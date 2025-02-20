'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section */}
      <div className="relative w-full h-[calc(100vh-5rem)]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/premium_photo-1675186049222-0b5018db6ce9.jpeg"
            alt="Hero background"
            fill
            priority
            className="object-cover"
            quality={100}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full bg-black/30">
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button className="p-2 text-white hover:bg-white/10 rounded-full">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div className="text-center text-white">
              <p className="text-lg mb-2">YAZ 2025</p>
              <h1 className="text-4xl font-bold mb-4">YENİ<br/>KOLEKSİYON</h1>
              <p className="text-sm mb-6 max-w-xs mx-auto">
                Kendi tarzını yaratmak için doğru yerdesin.
              </p>
              <button className="bg-[#2DC071] hover:bg-[#2DC071]/90 text-white px-10 py-2.5 rounded-md">
                ALIŞVERİŞE BAŞLA
              </button>
            </div>
            <button className="p-2 text-white hover:bg-white/10 rounded-full">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}