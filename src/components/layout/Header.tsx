import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Bandage
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>

          {/* Main Navigation - Hidden on Mobile */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-gray-600">
              <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
              <li><Link href="/product" className="hover:text-gray-900">Product</Link></li>
              <li><Link href="/pricing" className="hover:text-gray-900">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
            </ul>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-5">
            <div className="hidden md:flex items-center space-x-2 text-[#23A6F0]">
              <User className="w-5 h-5" />
              <span>Login / Register</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-[#23A6F0]">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-[#23A6F0]">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <span className="text-[#23A6F0]">1</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 