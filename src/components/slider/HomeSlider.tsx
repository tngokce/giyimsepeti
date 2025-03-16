'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    title: "YAZ 2025",
    subtitle: "YENİ KOLEKSİYON",
    description: "Kendi tarzını yaratmak için doğru yerdesin.",
    image: "/images/premium_photo-1675186049222-0b5018db6ce9.jpeg"
  },
  // Diğer slider'lar...
];

export default function HomeSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      className="h-[calc(100vh-5rem)]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          {/* Mevcut slider içeriğiniz */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
} 