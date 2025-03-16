'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src="/images/premium_photo-1675186049222-0b5018db6ce9.jpeg"
          alt="About Us Hero"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Hakkımızda</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              Modayı herkes için ulaşılabilir kılma misyonuyla çıktığımız yolda, 
              kaliteli ve şık ürünleri sizlerle buluşturuyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Story */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Hikayemiz</h2>
            <p className="text-gray-600">
              2024 yılında kurulan giyimSepeti, Türkiye'nin önde gelen e-ticaret 
              platformlarından biri olmayı hedeflemektedir. Müşteri memnuniyetini 
              her şeyin üstünde tutan anlayışımızla, en kaliteli ürünleri en uygun 
              fiyatlarla sunmaya devam ediyoruz.
            </p>
            <p className="text-gray-600">
              Teknoloji ve modayı bir araya getirerek, alışveriş deneyimini 
              yeniden tanımlıyoruz. Geniş ürün yelpazemiz ve kullanıcı dostu 
              platformumuzla, her tarza ve bütçeye uygun seçenekler sunuyoruz.
            </p>
          </div>

          {/* Right Column - Values */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Değerlerimiz</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-[#23A6F0] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Kalite</h3>
                  <p className="text-gray-600">
                    En yüksek kalite standartlarında ürünler sunuyoruz.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-[#23A6F0] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Güvenilirlik</h3>
                  <p className="text-gray-600">
                    Müşterilerimizin güvenini kazanmak için şeffaf ve dürüst 
                    bir yaklaşım benimsiyoruz.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-[#23A6F0] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">İnovasyon</h3>
                  <p className="text-gray-600">
                    Sürekli gelişim ve yenilik için çalışıyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#23A6F0]">1000+</div>
            <div className="text-gray-600 mt-2">Ürün Çeşidi</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#23A6F0]">50+</div>
            <div className="text-gray-600 mt-2">Marka</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#23A6F0]">10K+</div>
            <div className="text-gray-600 mt-2">Mutlu Müşteri</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#23A6F0]">24/7</div>
            <div className="text-gray-600 mt-2">Müşteri Desteği</div>
          </div>
        </div>
      </div>
    </div>
  );
} 