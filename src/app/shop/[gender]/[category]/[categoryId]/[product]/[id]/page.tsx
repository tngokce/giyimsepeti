'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { RootState } from '@/redux/store';
import { fetchProductDetail } from '@/redux/actions/productActions';
import { addToCart } from '@/redux/actions/shoppingCartActions';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { id } = params;
  const productId = typeof id === 'string' ? parseInt(id) : undefined;
  
  const { productDetail, fetchState } = useSelector((state: RootState) => state.product);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (productId) {
      // @ts-ignore (Redux Thunk tiplemesi için)
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);
  
  // Fiyat formatı
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  // Yıldız derecelendirme bileşeni
  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };
  
  // Miktar değiştirme
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (productDetail?.stock || 1)) {
      setQuantity(value);
    }
  };
  
  // Miktar artırma/azaltma
  const adjustQuantity = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0 && newQuantity <= (productDetail?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };
  
  // Geri butonu
  const handleBack = () => {
    router.back();
  };
  
  // Sepete ekleme işlevi
  const handleAddToCart = () => {
    if (productDetail && productDetail.stock > 0) {
      dispatch(addToCart(productDetail, quantity));
      
      // Kullanıcıya bildirim göster
      alert(`${quantity} adet ${productDetail.name} sepete eklendi.`);
    }
  };
  
  if (fetchState === 'FETCHING') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }
  
  if (fetchState === 'FAILED' || !productDetail) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-500 mb-4">Ürün bilgileri yüklenirken bir hata oluştu.</p>
        <button 
          onClick={handleBack}
          className="inline-flex items-center text-[#23A6F0] hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Geri Dön
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-[#23A6F0]">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-[#23A6F0]">Mağaza</Link>
            {params.gender && params.category && (
              <>
                <span className="mx-2">/</span>
                <Link 
                  href={`/shop/${params.gender}/${params.category}/${params.categoryId}`}
                  className="hover:text-[#23A6F0]"
                >
                  {typeof params.category === 'string' 
                    ? params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                    : ''}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{productDetail.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Geri Butonu */}
        <button 
          onClick={handleBack}
          className="inline-flex items-center text-[#23A6F0] hover:underline mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Geri Dön
        </button>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Ürün Görselleri */}
          <div className="md:w-1/2">
            {/* Ana Görsel */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <Image
                src={productDetail.images[selectedImage]?.url || '/images/product-placeholder.jpg'}
                alt={productDetail.name}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Küçük Görseller */}
            {productDetail.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {productDetail.images.map((image: any, index: number) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 rounded-md overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-[#23A6F0]' : 'ring-1 ring-gray-200'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image.url || '/images/product-placeholder.jpg'}
                      alt={`${productDetail.name} - Görsel ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Ürün Bilgileri */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{productDetail.name}</h1>
            
            {/* Derecelendirme */}
            <div className="mb-4">
              <RatingStars rating={productDetail.rating} />
            </div>
            
            {/* Fiyat */}
            <div className="text-2xl font-bold text-[#23A6F0] mb-4">
              {formatPrice(productDetail.price)}
            </div>
            
            {/* Stok Durumu */}
            <div className="mb-6">
              <span className="text-sm text-gray-600">Stok Durumu: </span>
              {productDetail.stock > 0 ? (
                <span className="text-green-600 font-medium">{productDetail.stock} adet</span>
              ) : (
                <span className="text-red-600 font-medium">Tükendi</span>
              )}
            </div>
            
            {/* Açıklama */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Ürün Açıklaması</h2>
              <p className="text-gray-600">{productDetail.description}</p>
            </div>
            
            {/* Miktar */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Miktar</h2>
              <div className="flex items-center">
                <button 
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
                  onClick={() => adjustQuantity(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={productDetail.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 h-8 border-t border-b border-gray-300 text-center"
                />
                <button 
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
                  onClick={() => adjustQuantity(1)}
                  disabled={quantity >= productDetail.stock}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Aksiyon Butonları */}
            <div className="flex space-x-4">
              <button 
                className="flex-1 bg-[#23A6F0] text-white py-3 px-6 rounded-md flex items-center justify-center hover:bg-[#1a7ac0]"
                disabled={productDetail.stock <= 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Sepete Ekle
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 