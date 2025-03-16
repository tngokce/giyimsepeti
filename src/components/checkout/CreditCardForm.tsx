'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CreditCard } from 'lucide-react';

interface CreditCardFormProps {
  initialData?: CreditCardFormData;
  onSubmit: (data: CreditCardFormData) => void;
  onCancel: () => void;
}

export interface CreditCardFormData {
  id?: number;
  card_no: string;
  expire_month: number;
  expire_year: number;
  name_on_card: string;
  cvv?: string; // Only used for form validation, not sent to API
}

export default function CreditCardForm({ initialData, onSubmit, onCancel }: CreditCardFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<CreditCardFormData>({
    defaultValues: initialData || {
      card_no: '',
      expire_month: new Date().getMonth() + 1, // Current month
      expire_year: new Date().getFullYear(),
      name_on_card: '',
      cvv: ''
    }
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Format credit card number with spaces
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '') // Remove existing spaces
      .replace(/(.{4})/g, '$1 ') // Add space after every 4 characters
      .trim(); // Remove trailing space
  };

  // Watch card number for formatting
  const cardNumber = watch('card_no');
  const [formattedCardNumber, setFormattedCardNumber] = useState('');

  useEffect(() => {
    if (cardNumber) {
      setFormattedCardNumber(formatCardNumber(cardNumber));
    }
  }, [cardNumber]);

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Generate year options (current year + 20 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear + i);

  const handleFormSubmit = (data: CreditCardFormData) => {
    // Remove spaces from card number before submitting
    const formattedData = {
      ...data,
      card_no: data.card_no.replace(/\s/g, '')
    };
    
    // Remove CVV as it's not needed for API
    delete formattedData.cvv;
    
    onSubmit(formattedData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">
        {initialData?.id ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}
      </h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Card Number */}
        <div>
          <label htmlFor="card_no" className="block text-sm font-medium text-gray-700 mb-1">
            Kart Numarası
          </label>
          <div className="relative">
            <input
              id="card_no"
              type="text"
              className={`w-full px-3 py-2 pl-10 border rounded-md ${errors.card_no ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="1234 5678 9012 3456"
              maxLength={19} // 16 digits + 3 spaces
              {...register('card_no', { 
                required: 'Kart numarası gerekli',
                pattern: {
                  value: /^[\d\s]{16,19}$/,
                  message: 'Geçerli bir kart numarası girin'
                },
                validate: {
                  length: (value) => value.replace(/\s/g, '').length === 16 || 'Kart numarası 16 haneli olmalıdır'
                }
              })}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value.replace(/[^\d]/g, '').substring(0, 16));
                e.target.value = formatted;
              }}
            />
            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.card_no && (
            <p className="mt-1 text-sm text-red-500">{errors.card_no.message}</p>
          )}
        </div>
        
        {/* Name on Card */}
        <div>
          <label htmlFor="name_on_card" className="block text-sm font-medium text-gray-700 mb-1">
            Kart Üzerindeki İsim
          </label>
          <input
            id="name_on_card"
            type="text"
            className={`w-full px-3 py-2 border rounded-md ${errors.name_on_card ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="AD SOYAD"
            {...register('name_on_card', { 
              required: 'Kart üzerindeki isim gerekli',
              minLength: {
                value: 3,
                message: 'İsim en az 3 karakter olmalıdır'
              }
            })}
          />
          {errors.name_on_card && (
            <p className="mt-1 text-sm text-red-500">{errors.name_on_card.message}</p>
          )}
        </div>
        
        {/* Expiration Date and CVV */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Month */}
          <div>
            <label htmlFor="expire_month" className="block text-sm font-medium text-gray-700 mb-1">
              Ay
            </label>
            <select
              id="expire_month"
              className={`w-full px-3 py-2 border rounded-md ${errors.expire_month ? 'border-red-500' : 'border-gray-300'}`}
              {...register('expire_month', { 
                required: 'Ay seçimi gerekli',
                valueAsNumber: true
              })}
            >
              {months.map(month => (
                <option key={month} value={month}>
                  {month < 10 ? `0${month}` : month}
                </option>
              ))}
            </select>
            {errors.expire_month && (
              <p className="mt-1 text-sm text-red-500">{errors.expire_month.message}</p>
            )}
          </div>
          
          {/* Year */}
          <div>
            <label htmlFor="expire_year" className="block text-sm font-medium text-gray-700 mb-1">
              Yıl
            </label>
            <select
              id="expire_year"
              className={`w-full px-3 py-2 border rounded-md ${errors.expire_year ? 'border-red-500' : 'border-gray-300'}`}
              {...register('expire_year', { 
                required: 'Yıl seçimi gerekli',
                valueAsNumber: true
              })}
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.expire_year && (
              <p className="mt-1 text-sm text-red-500">{errors.expire_year.message}</p>
            )}
          </div>
          
          {/* CVV */}
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              id="cvv"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="123"
              maxLength={3}
              {...register('cvv', { 
                required: !initialData?.id ? 'CVV gerekli' : false, // Only required for new cards
                pattern: {
                  value: /^\d{3}$/,
                  message: 'CVV 3 haneli olmalıdır'
                }
              })}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^\d]/g, '').substring(0, 3);
              }}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-500">{errors.cvv.message}</p>
            )}
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#23A6F0] text-white rounded-md hover:bg-[#1a7ac0] disabled:opacity-50"
          >
            {isSubmitting ? 'Kaydediliyor...' : initialData?.id ? 'Güncelle' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 