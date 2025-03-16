'use client';

import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-20">
      {/* Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">İletişim</h1>
          <p className="mt-2 text-gray-600">Bizimle iletişime geçin</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Information */}
          <div className="w-full md:w-1/3 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                İletişim Bilgileri
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#23A6F0] mt-1" />
                  <div>
                    <p className="font-medium">Adres</p>
                    <p className="text-gray-600">
                      Atatürk Mah. İstiklal Cad. No:123
                      <br />
                      Şişli, İstanbul
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#23A6F0] mt-1" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-gray-600">+90 (212) 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#23A6F0] mt-1" />
                  <div>
                    <p className="font-medium">E-posta</p>
                    <p className="text-gray-600">info@giyimsepeti.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Çalışma Saatleri
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Pazartesi - Cuma:</span> 09:00 - 18:00
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Cumartesi:</span> 10:00 - 16:00
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Pazar:</span> Kapalı
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              İletişim Formu
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23A6F0] focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-[#23A6F0] text-white rounded-md hover:bg-[#1a7ac0] transition-colors"
              >
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 