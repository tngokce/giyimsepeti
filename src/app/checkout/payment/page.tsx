'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { 
  fetchCreditCards, 
  createCreditCard, 
  updateCreditCardThunk, 
  deleteCreditCardThunk 
} from '@/redux/actions/clientActions';
import { setPayment } from '@/redux/actions/shoppingCartActions';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import CreditCardList from '@/components/checkout/CreditCardList';
import CreditCardForm, { CreditCardFormData } from '@/components/checkout/CreditCardForm';

export default function PaymentPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { creditCards } = useSelector((state: RootState) => state.client);
  const { cart, address, payment: selectedPayment } = useSelector((state: RootState) => state.shoppingCart);
  
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState<CreditCardFormData | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | undefined>(
    selectedPayment?.card?.id
  );
  const [use3DSecure, setUse3DSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch credit cards on component mount
  useEffect(() => {
    const loadCreditCards = async () => {
      setIsLoading(true);
      try {
        // @ts-ignore (Redux Thunk tiplemesi için)
        const result = await dispatch(fetchCreditCards());
        if (result && result.success) {
          // If there's a selected card in the store, use it
          // Otherwise, if there are cards, select the first one
          if (!selectedCardId && result.data && result.data.length > 0) {
            setSelectedCardId(result.data[0].id);
            dispatch(setPayment({
              card: result.data[0],
              use3DSecure: use3DSecure
            }));
          }
        }
      } catch (error) {
        console.error('Error loading credit cards:', error);
        toast.error('Kredi kartları yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCreditCards();
  }, [dispatch, selectedCardId]);

  // Redirect to checkout if no address is selected
  useEffect(() => {
    if (!address) {
      router.push('/checkout');
      toast.info('Lütfen önce teslimat adresinizi seçin.');
    }
  }, [address, router]);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
      toast.info('Sepetiniz boş. Lütfen önce sepetinize ürün ekleyin.');
    }
  }, [cart, router]);

  // Handle card selection
  const handleSelectCard = (cardId: number) => {
    setSelectedCardId(cardId);
    const card = creditCards.find(c => c.id === cardId);
    if (card) {
      dispatch(setPayment({
        card: card,
        use3DSecure: use3DSecure
      }));
    }
  };

  // Handle 3D Secure toggle
  const handle3DSecureToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUse3DSecure(e.target.checked);
    
    if (selectedCardId) {
      const card = creditCards.find(c => c.id === selectedCardId);
      if (card) {
        dispatch(setPayment({
          card: card,
          use3DSecure: e.target.checked
        }));
      }
    }
  };

  // Handle new card button click
  const handleAddNewCard = () => {
    setEditingCard(null);
    setShowCardForm(true);
  };

  // Handle edit card button click
  const handleEditCard = (card: CreditCardFormData) => {
    setEditingCard(card);
    setShowCardForm(true);
  };

  // Handle card form submission
  const handleCardSubmit = async (data: CreditCardFormData) => {
    try {
      if (data.id) {
        // Update existing card
        // @ts-ignore (Redux Thunk tiplemesi için)
        const result = await dispatch(updateCreditCardThunk(data));
        if (result && result.success) {
          toast.success('Kart başarıyla güncellendi.');
          
          // If this was the selected card, update it in the store
          if (selectedCardId === data.id) {
            dispatch(setPayment({
              card: result.data,
              use3DSecure: use3DSecure
            }));
          }
        } else {
          toast.error('Kart güncellenirken bir hata oluştu.');
        }
      } else {
        // Create new card
        // @ts-ignore (Redux Thunk tiplemesi için)
        const result = await dispatch(createCreditCard(data));
        if (result && result.success) {
          toast.success('Kart başarıyla eklendi.');
          
          // If no card was selected before, select this one
          if (!selectedCardId) {
            setSelectedCardId(result.data.id);
            dispatch(setPayment({
              card: result.data,
              use3DSecure: use3DSecure
            }));
          }
        } else {
          toast.error('Kart eklenirken bir hata oluştu.');
        }
      }
      
      // Close the form
      setShowCardForm(false);
      setEditingCard(null);
    } catch (error) {
      console.error('Error submitting card:', error);
      toast.error('İşlem sırasında bir hata oluştu.');
    }
  };

  // Handle card deletion
  const handleDeleteCard = async (cardId: number) => {
    try {
      // @ts-ignore (Redux Thunk tiplemesi için)
      const result = await dispatch(deleteCreditCardThunk(cardId));
      if (result && result.success) {
        toast.success('Kart başarıyla silindi.');
        
        // If this was the selected card, clear it
        if (selectedCardId === cardId) {
          setSelectedCardId(undefined);
          dispatch(setPayment(null));
          
          // If there are other cards, select the first one
          if (creditCards.length > 1) {
            const newSelectedCard = creditCards.find(card => card.id !== cardId);
            if (newSelectedCard) {
              setSelectedCardId(newSelectedCard.id);
              dispatch(setPayment({
                card: newSelectedCard,
                use3DSecure: use3DSecure
              }));
            }
          }
        }
      } else {
        toast.error('Kart silinirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('İşlem sırasında bir hata oluştu.');
    }
  };

  // Handle complete order
  const handleCompleteOrder = () => {
    if (!selectedCardId) {
      toast.error('Lütfen bir kart seçin veya yeni kart ekleyin.');
      return;
    }
    
    // Here you would typically make an API call to create the order
    // For now, we'll just show a success message
    toast.success('Siparişiniz başarıyla oluşturuldu!');
    
    // Navigate to order confirmation page
    // router.push('/checkout/confirmation');
  };

  // Calculate total price
  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.product.price * item.count), 0);
    const shippingCost = 29.99;
    const freeShippingThreshold = 150;
    const shippingDiscount = subtotal >= freeShippingThreshold ? shippingCost : 0;
    
    return subtotal + shippingCost - shippingDiscount;
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Ödeme</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Checkout Steps */}
            <div className="mb-8">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">Adres Bilgileri</h2>
                  <p className="text-gray-600 text-sm">Teslimat adresi seçildi</p>
                </div>
              </div>
              <div className="ml-4 pl-4 border-l border-gray-200 mt-2 mb-2 h-8"></div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-[#23A6F0] text-white rounded-full">
                  2
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">Ödeme Seçenekleri</h2>
                  <p className="text-gray-600 text-sm">Ödeme yönteminizi seçin</p>
                </div>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Kart Bilgileri</h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
                </div>
              ) : showCardForm ? (
                <CreditCardForm
                  initialData={editingCard || undefined}
                  onSubmit={handleCardSubmit}
                  onCancel={() => {
                    setShowCardForm(false);
                    setEditingCard(null);
                  }}
                />
              ) : (
                <CreditCardList
                  cards={creditCards}
                  selectedCardId={selectedCardId}
                  onSelect={handleSelectCard}
                  onEdit={handleEditCard}
                  onDelete={handleDeleteCard}
                  onAddNew={handleAddNewCard}
                />
              )}
              
              {/* 3D Secure Option */}
              {!showCardForm && creditCards.length > 0 && (
                <div className="mt-6 border-t pt-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={use3DSecure}
                      onChange={handle3DSecureToggle}
                      className="form-checkbox h-5 w-5 text-[#23A6F0] rounded border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">3D Secure ile ödemek istiyorum</span>
                  </label>
                </div>
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => router.push('/checkout')}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Adres Bilgilerine Dön
              </button>
              <button
                onClick={handleCompleteOrder}
                disabled={!selectedCardId}
                className={`px-6 py-3 rounded-md text-white ${
                  selectedCardId
                    ? 'bg-[#F27A1A] hover:bg-[#e06c10]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Siparişi Tamamla
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Sipariş Özeti</h2>
              
              <div className="space-y-4 mb-6">
                {/* Product List */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item.count} adet x {item.product.price.toFixed(2)} TL
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {(item.product.price * item.count).toFixed(2)} TL
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Address Summary */}
                {address && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Teslimat Adresi</h3>
                    <p className="text-sm text-gray-600">
                      {address.name} {address.surname}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.neighborhood}, {address.district}, {address.city}
                    </p>
                  </div>
                )}
                
                {/* Price Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-medium">
                      {cart.reduce((total, item) => total + (item.product.price * item.count), 0).toFixed(2)} TL
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Kargo</span>
                    <span className="font-medium">29.99 TL</span>
                  </div>
                  {cart.reduce((total, item) => total + (item.product.price * item.count), 0) >= 150 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Kargo İndirimi</span>
                      <span>-29.99 TL</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Toplam</span>
                    <span className="text-[#F27A1A]">
                      {calculateTotal().toFixed(2)} TL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 