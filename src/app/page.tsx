import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Slider Section */}
      <div className="relative w-full h-screen bg-sky-400">
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button className="p-2 text-white hover:bg-white/10 rounded-full">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="text-center text-white">
            <p className="text-lg mb-2">SUMMER 2020</p>
            <h1 className="text-4xl font-bold mb-4">NEW<br/>COLLECTION</h1>
            <p className="text-sm mb-6 max-w-xs mx-auto">
              We know how large objects will act, but things on a small scale.
            </p>
            <button className="bg-[#2DC071] hover:bg-[#2DC071]/90 text-white px-10 py-2.5 rounded-md">
              SHOP NOW
            </button>
          </div>
          <button className="p-2 text-white hover:bg-white/10 rounded-full">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-4 px-4">
        <div className="aspect-square relative">
          <Image
            src="/category-women.jpg"
            alt="Kadın"
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <span className="text-white text-xl font-bold">Kadın</span>
          </div>
        </div>
        <div className="aspect-square relative">
          <Image
            src="/category-men.jpg"
            alt="Erkek"
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <span className="text-white text-xl font-bold">Erkek</span>
          </div>
        </div>
      </div>
    </div>
  );
} 