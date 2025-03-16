'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { 
  fetchAddresses, 
  createAddress, 
  updateAddressThunk, 
  deleteAddressThunk 
} from '@/redux/actions/clientActions';
import { setAddress } from '@/redux/actions/shoppingCartActions';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import AddressList from '@/components/checkout/AddressList';
import AddressForm, { AddressFormData } from '@/components/checkout/AddressForm';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { addressList } = useSelector((state: RootState) => state.client);
  const { cart, address: selectedAddress } = useSelector((state: RootState) => state.shoppingCart);
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressFormData | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(
    selectedAddress?.id
  );
  const [isLoading, setIsLoading] = useState(true);

  // Fetch addresses on component mount
  useEffect(() => {
    const loadAddresses = async () => {
      setIsLoading(true);
      try {
        // @ts-ignore (Redux Thunk tiplemesi için)
        const result = await dispatch(fetchAddresses());
        if (result && result.success) {
          // If there's a selected address in the store, use it
          // Otherwise, if there are addresses, select the first one
          if (!selectedAddressId && result.data && result.data.length > 0) {
            setSelectedAddressId(result.data[0].id);
            dispatch(setAddress(result.data[0]));
          }
        }
      } catch (error) {
        console.error('Error loading addresses:', error);
        toast.error('Adresler yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAddresses();
  }, [dispatch, selectedAddressId]);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
      toast.info('Sepetiniz boş. Lütfen önce sepetinize ürün ekleyin.');
    }
  }, [cart, router]);

  // Handle address selection
  const handleSelectAddress = (addressId: number) => {
    setSelectedAddressId(addressId);
    const address = addressList.find(addr => addr.id === addressId);
    if (address) {
      dispatch(setAddress(address));
    }
  };

  // Handle new address button click
  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  // Handle edit address button click
  const handleEditAddress = (address: AddressFormData) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  // Handle address form submission
  const handleAddressSubmit = async (data: AddressFormData) => {
    try {
      if (data.id) {
        // Update existing address
        // @ts-ignore (Redux Thunk tiplemesi için)
        const result = await dispatch(updateAddressThunk(data));
        if (result && result.success) {
          toast.success('Adres başarıyla güncellendi.');
          
          // If this was the selected address, update it in the store
          if (selectedAddressId === data.id) {
            dispatch(setAddress(result.data));
          }
        } else {
          toast.error('Adres güncellenirken bir hata oluştu.');
        }
      } else {
        // Create new address
        // @ts-ignore (Redux Thunk tiplemesi için)
        const result = await dispatch(createAddress(data));
        if (result && result.success) {
          toast.success('Adres başarıyla eklendi.');
          
          // If no address was selected before, select this one
          if (!selectedAddressId) {
            setSelectedAddressId(result.data.id);
            dispatch(setAddress(result.data));
          }
        } else {
          toast.error('Adres eklenirken bir hata oluştu.');
        }
      }
      
      // Close the form
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Error submitting address:', error);
      toast.error('İşlem sırasında bir hata oluştu.');
    }
  };

  // Handle address deletion
  const handleDeleteAddress = async (addressId: number) => {
    try {
      // @ts-ignore (Redux Thunk tiplemesi için)
      const result = await dispatch(deleteAddressThunk(addressId));
      if (result && result.success) {
        toast.success('Adres başarıyla silindi.');
        
        // If this was the selected address, clear it
        if (selectedAddressId === addressId) {
          setSelectedAddressId(undefined);
          dispatch(setAddress(null));
          
          // If there are other addresses, select the first one
          if (addressList.length > 1) {
            const newSelectedAddress = addressList.find(addr => addr.id !== addressId);
            if (newSelectedAddress) {
              setSelectedAddressId(newSelectedAddress.id);
              dispatch(setAddress(newSelectedAddress));
            }
          }
        }
      } else {
        toast.error('Adres silinirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('İşlem sırasında bir hata oluştu.');
    }
  };

  // Handle continue to payment
  const handleContinueToPayment = () => {
    if (!selectedAddressId) {
      toast.error('Lütfen bir adres seçin veya yeni adres ekleyin.');
      return;
    }
    
    // Navigate to payment page
    router.push('/checkout/payment');
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Sipariş Oluştur</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Checkout Steps */}
            <div className="mb-8">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-[#23A6F0] text-white rounded-full">
                  1
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">Adres Bilgileri</h2>
                  <p className="text-gray-600 text-sm">Teslimat adresinizi seçin veya yeni adres ekleyin</p>
                </div>
              </div>
              <div className="ml-4 pl-4 border-l border-gray-200 mt-2 mb-2 h-8"></div>
              <div className="flex items-center opacity-50">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full">
                  2
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">Ödeme Seçenekleri</h2>
                  <p className="text-gray-600 text-sm">Ödeme yönteminizi seçin</p>
                </div>
              </div>
            </div>
            
            {/* Address Management */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
                </div>
              ) : showAddressForm ? (
                <AddressForm
                  initialData={editingAddress || undefined}
                  onSubmit={handleAddressSubmit}
                  onCancel={() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
                  }}
                />
              ) : (
                <AddressList
                  addresses={addressList}
                  selectedAddressId={selectedAddressId}
                  onSelect={handleSelectAddress}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                  onAddNew={handleAddNewAddress}
                />
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => router.push('/cart')}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Sepete Dön
              </button>
              <button
                onClick={handleContinueToPayment}
                disabled={!selectedAddressId}
                className={`px-6 py-3 rounded-md text-white ${
                  selectedAddressId
                    ? 'bg-[#23A6F0] hover:bg-[#1a7ac0]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Ödemeye Geç
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
                      {(
                        cart.reduce((total, item) => total + (item.product.price * item.count), 0) +
                        (cart.reduce((total, item) => total + (item.product.price * item.count), 0) >= 150 ? 0 : 29.99)
                      ).toFixed(2)} TL
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