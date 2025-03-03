'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Plus, ChevronRight } from 'lucide-react';
import { RootState } from '@/redux/store';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AddressCard from '@/components/checkout/AddressCard';
import AddressForm from '@/components/checkout/AddressForm';
import CardForm from '@/components/checkout/CardForm';
import CardItem from '@/components/checkout/CardItem';
import { 
  fetchAddresses, 
  setSelectedShippingAddress, 
  setSelectedBillingAddress,
  setSameBillingAddress
} from '@/redux/actions/addressActions';
import { fetchCards, setSelectedCard } from '@/redux/actions/paymentActions';
import { createOrder } from '@/redux/actions/orderActions';
import OrderSuccess from '@/components/checkout/OrderSuccess';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  
  const { addresses, loading, selectedShippingAddressId, selectedBillingAddressId, sameBillingAddress } = 
    useSelector((state: RootState) => state.address);
  
  const { cards, loading: cardsLoading, selectedCardId } = 
    useSelector((state: RootState) => state.payment);
  
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  
  const { loading: orderLoading, currentOrder, error: orderError } = 
    useSelector((state: RootState) => state.order);
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState<any>(null);
  const [step, setStep] = useState(1); // 1: Adres, 2: Ödeme
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Seçili ürünlerin toplam fiyatı
  const totalPrice = cart.reduce(
    (total, item) => total + (item.checked ? item.product.price * item.count : 0), 
    0
  );
  
  // Fiyat formatı
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  // Sayfa yüklendiğinde adresleri getir
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);
  
  // Adım 2'ye geçildiğinde kartları getir
  useEffect(() => {
    if (step === 2) {
      dispatch(fetchCards());
    }
  }, [dispatch, step]);
  
  // Teslimat adresi seçme
  const handleSelectShippingAddress = (addressId: number) => {
    dispatch(setSelectedShippingAddress(addressId));
    
    // Eğer fatura adresi teslimat adresi ile aynıysa, fatura adresini de güncelle
    if (sameBillingAddress) {
      dispatch(setSelectedBillingAddress(addressId));
    }
  };
  
  // Fatura adresi seçme
  const handleSelectBillingAddress = (addressId: number) => {
    dispatch(setSelectedBillingAddress(addressId));
  };
  
  // Fatura adresi teslimat adresi ile aynı mı
  const handleToggleSameBillingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSameBillingAddress(e.target.checked));
  };
  
  // Adres düzenleme
  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };
  
  // Adres formu başarılı
  const handleAddressFormSuccess = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    dispatch(fetchAddresses());
  };
  
  // Adres formu iptal
  const handleAddressFormCancel = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };
  
  // Kart seçme
  const handleSelectCard = (cardId: number) => {
    dispatch(setSelectedCard(cardId));
  };
  
  // Kart düzenleme
  const handleEditCard = (card: any) => {
    setEditingCard(card);
    setShowCardForm(true);
  };
  
  // Kart formu başarılı
  const handleCardFormSuccess = () => {
    setShowCardForm(false);
    setEditingCard(null);
    dispatch(fetchCards());
  };
  
  // Kart formu iptal
  const handleCardFormCancel = () => {
    setShowCardForm(false);
    setEditingCard(null);
  };
  
  // Devam et butonu
  const handleContinue = () => {
    if (step === 1) {
      // Adres adımından ödeme adımına geç
      if (!selectedShippingAddressId) {
        alert('Lütfen bir teslimat adresi seçin');
        return;
      }
      
      if (!sameBillingAddress && !selectedBillingAddressId) {
        alert('Lütfen bir fatura adresi seçin');
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      // Ödeme adımından sipariş tamamlamaya geç
      if (!selectedCardId) {
        alert('Lütfen bir ödeme yöntemi seçin');
        return;
      }
      
      if (!termsAccepted) {
        alert('Lütfen koşulları kabul edin');
        return;
      }
      
      // Burada sipariş tamamlama API çağrısı yapılacak
      alert('Sipariş başarıyla tamamlandı!');
    }
  };
  
  // Siparişi tamamlama
  const handleCompleteOrder = async () => {
    if (!selectedCardId || !selectedShippingAddressId || !termsAccepted) {
      alert('Lütfen gerekli tüm alanları doldurun ve koşulları kabul edin');
      return;
    }
    
    // Seçili adres ve kartı bul
    const selectedAddress = addresses.find((address: any) => address.id === selectedShippingAddressId);
    const selectedCard = cards.find((card: any) => card.id === selectedCardId);
    
    if (!selectedAddress || !selectedCard) {
      alert('Seçili adres veya kart bulunamadı');
      return;
    }
    
    // Sepetteki seçili ürünleri al
    const selectedProducts = cart
      .filter(item => item.checked)
      .map(item => ({
        product_id: item.product.id,
        count: item.count,
        detail: `${item.product.name} - ${item.product.size || 'Standart'}`
      }));
    
    if (selectedProducts.length === 0) {
      alert('Sepetinizde seçili ürün bulunmamaktadır');
      return;
    }
    
    // Sipariş verisi oluştur
    const orderData = {
      address_id: selectedAddress.id,
      order_date: new Date().toISOString(),
      card_no: selectedCard.card_no.replace(/\s/g, ''),
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      card_ccv: "123", // Güvenlik nedeniyle CVV saklanmadığı için varsayılan değer
      price: totalPrice,
      products: selectedProducts
    };
    
    try {
      // Sipariş oluştur
      const result = await dispatch(createOrder(orderData));
      
      if (result) {
        setOrderSuccess(true);
      }
    } catch (error) {
      console.error('Sipariş oluşturulurken hata oluştu:', error);
      alert('Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 pt-24 pb-12">
        {orderSuccess && currentOrder ? (
          <OrderSuccess orderId={currentOrder.id} />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Sipariş Oluştur</h1>
            
            {/* Adım Göstergesi */}
            <div className="flex mb-8">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    step >= 1 ? 'bg-[#F27A1A]' : 'bg-gray-300'
                  }`}>
                    1
                  </div>
                  <div className="ml-2">
                    <p className="font-medium">Adres Bilgileri</p>
                  </div>
                </div>
              </div>
              
              <div className="w-16 flex items-center justify-center">
                <div className={`h-1 w-full ${step >= 2 ? 'bg-[#F27A1A]' : 'bg-gray-300'}`}></div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-[#F27A1A] text-white' : 'bg-gray-300 text-white'
                  }`}>
                    2
                  </div>
                  <div className="ml-2">
                    <p className="font-medium">Ödeme Seçenekleri</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {step === 1 && (
                  <div>
                    {showAddressForm ? (
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-bold mb-4">{editingAddress ? 'Adres Düzenle' : 'Yeni Adres Ekle'}</h2>
                        <AddressForm 
                          initialData={editingAddress}
                          onSuccess={handleAddressFormSuccess}
                          onCancel={handleAddressFormCancel}
                        />
                      </div>
                    ) : (
                      <div>
                        {/* Teslimat Adresi */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">Teslimat Adresi</h2>
                            <button 
                              onClick={() => {
                                setEditingAddress(null);
                                setShowAddressForm(true);
                              }}
                              className="flex items-center text-sm text-[#F27A1A] hover:underline"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Yeni Adres Ekle
                            </button>
                          </div>
                          
                          {loading ? (
                            <p>Adresler yükleniyor...</p>
                          ) : addresses.length === 0 ? (
                            <p>Kayıtlı adresiniz bulunmamaktadır.</p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {addresses.map((address: any) => (
                                <AddressCard 
                                  key={address.id}
                                  address={address}
                                  isSelected={address.id === selectedShippingAddressId}
                                  onSelect={() => handleSelectShippingAddress(address.id)}
                                  onEdit={() => handleEditAddress(address)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Fatura Adresi */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                          <div className="flex items-center mb-4">
                            <input 
                              type="checkbox" 
                              id="sameBillingAddress" 
                              checked={sameBillingAddress}
                              onChange={handleToggleSameBillingAddress}
                              className="w-4 h-4 text-[#F27A1A] border-gray-300 rounded focus:ring-[#F27A1A]"
                            />
                            <label htmlFor="sameBillingAddress" className="ml-2 font-medium">
                              Faturamı Aynı Adrese Gönder
                            </label>
                          </div>
                          
                          {!sameBillingAddress && (
                            <div>
                              <h2 className="text-lg font-bold mb-4">Fatura Adresi</h2>
                              
                              {loading ? (
                                <p>Adresler yükleniyor...</p>
                              ) : addresses.length === 0 ? (
                                <p>Kayıtlı adresiniz bulunmamaktadır.</p>
                              ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {addresses.map((address: any) => (
                                    <AddressCard 
                                      key={`billing-${address.id}`}
                                      address={address}
                                      isSelected={address.id === selectedBillingAddressId}
                                      onSelect={() => handleSelectBillingAddress(address.id)}
                                      onEdit={() => handleEditAddress(address)}
                                    />
                                  ))}
                                </div>
                              )}
                              
                              <div className="mt-4 p-4 bg-blue-50 rounded-md flex items-start">
                                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-xs">i</div>
                                <p className="text-sm text-blue-800">
                                  Kurumsal faturalı alışveriş yapmak için "Faturamı Aynı Adrese Gönder" tikini kaldırın ve Fatura adresi olarak kayıtlı Kurumsal Fatura adresinizi seçin.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {step === 2 && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-bold mb-4">Ödeme Seçenekleri</h2>
                    
                    {showCardForm ? (
                      <CardForm 
                        initialData={editingCard}
                        onSuccess={handleCardFormSuccess}
                        onCancel={handleCardFormCancel}
                      />
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Kayıtlı Kartlarım</h3>
                          <button 
                            onClick={() => {
                              setEditingCard(null);
                              setShowCardForm(true);
                            }}
                            className="flex items-center text-sm text-[#F27A1A] hover:underline"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Yeni Kart Ekle
                          </button>
                        </div>
                        
                        {cardsLoading ? (
                          <p>Kartlar yükleniyor...</p>
                        ) : cards.length === 0 ? (
                          <div className="p-4 border border-dashed rounded-md text-center mb-6">
                            <p className="text-gray-500">Kayıtlı kartınız bulunmamaktadır.</p>
                            <button 
                              onClick={() => {
                                setEditingCard(null);
                                setShowCardForm(true);
                              }}
                              className="mt-2 text-[#F27A1A] hover:underline"
                            >
                              Kart Ekle
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {cards.map((card: any) => (
                              <CardItem 
                                key={card.id}
                                card={card}
                                isSelected={card.id === selectedCardId}
                                onSelect={() => handleSelectCard(card.id)}
                                onEdit={() => handleEditCard(card)}
                              />
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-8">
                          <h3 className="font-medium mb-4">Taksit Seçenekleri</h3>
                          
                          <div className="border rounded-md">
                            <div className="p-4 border-b bg-gray-50">
                              <div className="flex justify-between">
                                <span className="font-medium">Taksit Sayısı</span>
                                <span className="font-medium">Toplam</span>
                              </div>
                            </div>
                            
                            <div className="divide-y">
                              <div className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <input 
                                    type="radio" 
                                    id="installment-1" 
                                    name="installment" 
                                    className="w-4 h-4 text-[#F27A1A] border-gray-300 focus:ring-[#F27A1A]"
                                    defaultChecked
                                  />
                                  <label htmlFor="installment-1" className="ml-2">
                                    Tek Çekim
                                  </label>
                                </div>
                                <span>{formatPrice(totalPrice)}</span>
                              </div>
                              
                              <div className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <input 
                                    type="radio" 
                                    id="installment-3" 
                                    name="installment" 
                                    className="w-4 h-4 text-[#F27A1A] border-gray-300 focus:ring-[#F27A1A]"
                                  />
                                  <label htmlFor="installment-3" className="ml-2">
                                    3 Taksit
                                  </label>
                                </div>
                                <span>{formatPrice(totalPrice)}</span>
                              </div>
                              
                              <div className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <input 
                                    type="radio" 
                                    id="installment-6" 
                                    name="installment" 
                                    className="w-4 h-4 text-[#F27A1A] border-gray-300 focus:ring-[#F27A1A]"
                                  />
                                  <label htmlFor="installment-6" className="ml-2">
                                    6 Taksit
                                  </label>
                                </div>
                                <span>{formatPrice(totalPrice)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Sipariş Özeti */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-bold mb-4">Sipariş Özeti</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ürünün Toplamı</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Kargo Toplam</span>
                      <span>29,99 TL</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
                      <span>-29,99 TL</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span>Toplam</span>
                      <span className="text-[#F27A1A]">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={step === 1 ? handleContinue : handleCompleteOrder}
                    className={`w-full py-3 rounded-md text-center text-white font-medium flex items-center justify-center ${
                      (step === 1 && (!selectedShippingAddressId || (!sameBillingAddress && !selectedBillingAddressId))) ||
                      (step === 2 && (!selectedCardId || !termsAccepted))
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-[#F27A1A] hover:bg-[#e06c10]'
                    }`}
                    disabled={
                      (step === 1 && (!selectedShippingAddressId || (!sameBillingAddress && !selectedBillingAddressId))) ||
                      (step === 2 && (!selectedCardId || !termsAccepted)) ||
                      orderLoading
                    }
                  >
                    {orderLoading ? 'İşleniyor...' : step === 1 ? 'Kaydet ve Devam Et' : 'Siparişi Tamamla'}
                    {!orderLoading && <ChevronRight className="w-5 h-5 ml-1" />}
                  </button>
                  
                  {step === 2 && (
                    <div className="mt-4 text-xs text-gray-500">
                      <div className="flex items-center mb-2">
                        <input 
                          type="checkbox" 
                          id="termsAccepted" 
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="w-4 h-4 text-[#F27A1A] border-gray-300 rounded focus:ring-[#F27A1A]"
                        />
                        <label htmlFor="termsAccepted" className="ml-2 text-xs text-gray-500">
                          <span className="text-[#F27A1A]">Ön Bilgilendirme Koşulları</span> ve <span className="text-[#F27A1A]">Mesafeli Satış Sözleşmesi</span>'ni okudum, onaylıyorum.
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}