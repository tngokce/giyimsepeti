'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, ChevronDown, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUser } from '@/redux/actions/clientActions';
import md5 from 'md5';
import { setAuthToken } from '@/lib/axios';
import CategoryDropdown from './CategoryDropdown';
import CartDropdown from '../cart/CartDropdown';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.client.user);
  const categories = useSelector((state: RootState) => state.product.categories);

  // Gravatar için email hash'i oluştur
  const getGravatarUrl = (email: string) => {
    const hash = md5(email.toLowerCase().trim());
    return `https://www.gravatar.com/avatar/${hash}?d=mp&s=40`;
  };

  const handleLogout = () => {
    // Kullanıcı bilgilerini temizle
    dispatch(setUser(null));
    
    // Token'ı temizle
    setAuthToken(null);
    
    // Kullanıcı menüsünü kapat
    setIsUserMenuOpen(false);
  };

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
            className="md:hidden p-2 text-gray-500 hover:text-gray-700"
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
            <ul className="flex items-center space-x-8">
              <li><Link href="/" className="hover:text-gray-900">Ana Sayfa</Link></li>
              <li>
                <CategoryDropdown />
              </li>
              <li><Link href="/shop" className="hover:text-gray-900">Mağaza</Link></li>
              <li><Link href="/team" className="hover:text-gray-900">Ekibimiz</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900">İletişim</Link></li>
            </ul>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-5">
            {user ? (
              // Kullanıcı giriş yapmışsa
              <div className="hidden md:block relative">
                <button 
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={getGravatarUrl(user.email)}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profilim
                    </Link>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Kullanıcı giriş yapmamışsa
              <div className="hidden md:flex items-center space-x-2 text-[#23A6F0]">
                <User className="w-5 h-5" />
                <div className="flex space-x-2">
                  <Link href="/login" className="hover:text-[#1a7ac0]">Giriş</Link>
                  <span>/</span>
                  <Link href="/signup" className="hover:text-[#1a7ac0]">Kayıt Ol</Link>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-4">
              <button 
                className="text-[#23A6F0] hover:text-[#1a7ac0]"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>
              <CartDropdown />
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
                      {categories.map((category) => {
                        const slug = category.name ? category.name.toLowerCase().replace(/\s+/g, '-') : '';
                        const genderSlug = category.gender ? category.gender.toLowerCase() : '';
                        
                        return (
                          <Link 
                            key={category.id}
                            href={`/shop/${genderSlug}/${slug}/${category.id}`}
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {category.name || 'Kategori'}
                          </Link>
                        );
                      })}
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
                
                {/* Kullanıcı Bilgisi - Mobil */}
                <li>
                  {user ? (
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={getGravatarUrl(user.email)}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <Link 
                          href="/profile" 
                          className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Profilim
                        </Link>
                        <button 
                          className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center"
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  ) : (
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
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}