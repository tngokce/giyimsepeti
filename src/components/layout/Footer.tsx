'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4 md:w-1/4">
            <h2 className="text-2xl font-bold">giyimSepeti</h2>
            <p className="text-gray-400">
              Modayı keşfet, tarzını yansıt
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Company */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-lg">Şirket</h3>
              <Link href="/about" className="text-gray-400 hover:text-white">Hakkımızda</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">İletişim</Link>
              <Link href="/careers" className="text-gray-400 hover:text-white">Kariyer</Link>
            </div>

            {/* Help */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-lg">Yardım</h3>
              <Link href="/shipping" className="text-gray-400 hover:text-white">Kargo Takip</Link>
              <Link href="/returns" className="text-gray-400 hover:text-white">İade</Link>
              <Link href="/faq" className="text-gray-400 hover:text-white">SSS</Link>
            </div>

            {/* Legal */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-lg">Yasal</h3>
              <Link href="/privacy" className="text-gray-400 hover:text-white">Gizlilik</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">Kullanım Şartları</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 giyimSepeti. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 