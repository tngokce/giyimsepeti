'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white z-50">
          <div className="container mx-auto px-4 h-20">
            <div className="flex items-center h-full">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ürün, kategori veya marka ara..."
                  className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#23A6F0]"
                  autoFocus
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="ml-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="container mx-auto px-4 py-4 border-t">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Popüler Aramalar</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700">
                Elbise
              </button>
              <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700">
                T-shirt
              </button>
              <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700">
                Spor Ayakkabı
              </button>
              <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700">
                Jean Pantolon
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            giyimSepeti
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-gray-600">
              <li><Link href="/" className="hover:text-gray-900">Ana Sayfa</Link></li>
              <li className="relative">
                <button 
                  className="flex items-center space-x-1 hover:text-gray-900"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>Kategoriler</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 mt-1">
                    <div className="flex">
                      {/* Kadın Kategorileri */}
                      <div className="w-full">
                        <h3 className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-50">
                          Kadın
                        </h3>
                        <ul className="py-2">
                          <li>
                            <Link 
                              href="/kadin/elbise" 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Elbise
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/kadin/tisort" 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              T-shirt
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/kadin/pantolon" 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Pantolon
                            </Link>
                          </li>
                        </ul>
                        
                        <h3 className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-50">
                          Erkek
                        </h3>
                        <ul className="py-2">
                          <li>
                            <Link 
                              href="/erkek/tisort" 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              T-shirt
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/erkek/pantolon" 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Pantolon
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/erkek/gomlek" 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Gömlek
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li><Link href="/shop" className="hover:text-gray-900">Mağaza</Link></li>
              <li><Link href="/team" className="hover:text-gray-900">Ekibimiz</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900">İletişim</Link></li>
            </ul>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-5">
            <div className="hidden md:flex items-center space-x-2 text-[#23A6F0]">
              <User className="w-5 h-5" />
              <span>Giriş / Kayıt Ol</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="text-[#23A6F0] hover:text-[#1a7ac0]"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="text-[#23A6F0]">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <span className="text-[#23A6F0]">1</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <nav className="py-4">
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link 
                    href="/" 
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>Kategoriler</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isDropdownOpen && (
                    <div className="pl-8 mt-2 space-y-2">
                      <Link 
                        href="/kadin"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Kadın
                      </Link>
                      <Link 
                        href="/erkek"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Erkek
                      </Link>
                    </div>
                  )}
                </li>
                <li>
                  <Link 
                    href="/shop" 
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mağaza
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/team" 
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Ekibimiz
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/login" 
                    className="block px-4 py-2 text-[#23A6F0] hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Giriş / Kayıt Ol</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}