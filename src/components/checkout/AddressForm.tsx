'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface AddressFormProps {
  initialData?: AddressFormData;
  onSubmit: (data: AddressFormData) => void;
  onCancel: () => void;
}

export interface AddressFormData {
  id?: number;
  title: string;
  name: string;
  surname: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
}

// Turkish cities for dropdown
const cities = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
  'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
  'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
  'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
  'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
  'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
  'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
  'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];

export default function AddressForm({ initialData, onSubmit, onCancel }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AddressFormData>({
    defaultValues: initialData || {
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: ''
    }
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: AddressFormData) => {
    onSubmit(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">
        {initialData?.id ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
      </h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Address Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Adres Başlığı
          </label>
          <input
            id="title"
            type="text"
            className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Ev, İş, vb."
            {...register('title', { required: 'Adres başlığı gerekli' })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        
        {/* Name & Surname */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Ad
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              {...register('name', { required: 'Ad gerekli' })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
              Soyad
            </label>
            <input
              id="surname"
              type="text"
              className={`w-full px-3 py-2 border rounded-md ${errors.surname ? 'border-red-500' : 'border-gray-300'}`}
              {...register('surname', { required: 'Soyad gerekli' })}
            />
            {errors.surname && (
              <p className="mt-1 text-sm text-red-500">{errors.surname.message}</p>
            )}
          </div>
        </div>
        
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefon
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="05XX XXX XX XX"
            {...register('phone', { 
              required: 'Telefon gerekli',
              pattern: {
                value: /^0[0-9]{10}$/,
                message: 'Geçerli bir telefon numarası girin (05XX XXX XX XX)'
              }
            })}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
        
        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            İl
          </label>
          <select
            id="city"
            className={`w-full px-3 py-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            {...register('city', { required: 'İl seçimi gerekli' })}
          >
            <option value="">İl Seçin</option>
            {cities.map(city => (
              <option key={city} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
        
        {/* District */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
            İlçe
          </label>
          <input
            id="district"
            type="text"
            className={`w-full px-3 py-2 border rounded-md ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
            {...register('district', { required: 'İlçe gerekli' })}
          />
          {errors.district && (
            <p className="mt-1 text-sm text-red-500">{errors.district.message}</p>
          )}
        </div>
        
        {/* Neighborhood and Address Details */}
        <div>
          <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
            Mahalle ve Adres Detayları
          </label>
          <textarea
            id="neighborhood"
            rows={3}
            className={`w-full px-3 py-2 border rounded-md ${errors.neighborhood ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Mahalle, sokak, bina no, daire no"
            {...register('neighborhood', { required: 'Adres detayları gerekli' })}
          />
          {errors.neighborhood && (
            <p className="mt-1 text-sm text-red-500">{errors.neighborhood.message}</p>
          )}
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