'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCard, updateCard } from '@/redux/actions/paymentActions';

interface CardFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CardForm({ initialData, onSuccess, onCancel }: CardFormProps) {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Eğer düzenleme modundaysa, form verilerini doldur
  useEffect(() => {
    if (initialData) {
      setFormData({
        card_no: initialData.card_no || '',
        expire_month: initialData.expire_month?.toString() || '',
        expire_year: initialData.expire_year?.toString() || '',
        name_on_card: initialData.name_on_card || '',
        cvv: ''
      });
    }
  }, [initialData]);
  
  // Form alanlarını değiştirme
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Kart numarası için özel işlem
    if (name === 'card_no') {
      // Sadece rakamları al ve 16 karakterle sınırla
      const numericValue = value.replace(/\D/g, '').slice(0, 16);
      // 4'lü gruplar halinde formatlama
      const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } 
    // CVV için özel işlem
    else if (name === 'cvv') {
      // Sadece rakamları al ve 3-4 karakterle sınırla
      const numericValue = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Form doğrulama
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Kart numarası kontrolü
    const cardNoWithoutSpaces = formData.card_no.replace(/\s/g, '');
    if (!cardNoWithoutSpaces) {
      newErrors.card_no = 'Kart numarası gereklidir';
    } else if (cardNoWithoutSpaces.length !== 16) {
      newErrors.card_no = 'Kart numarası 16 haneli olmalıdır';
    }
    
    // Son kullanma ayı kontrolü
    if (!formData.expire_month) {
      newErrors.expire_month = 'Son kullanma ayı gereklidir';
    }
    
    // Son kullanma yılı kontrolü
    if (!formData.expire_year) {
      newErrors.expire_year = 'Son kullanma yılı gereklidir';
    }
    
    // Kart üzerindeki isim kontrolü
    if (!formData.name_on_card.trim()) {
      newErrors.name_on_card = 'Kart üzerindeki isim gereklidir';
    }
    
    // CVV kontrolü (sadece yeni kart eklerken)
    if (!initialData && (!formData.cvv || formData.cvv.length < 3)) {
      newErrors.cvv = 'Geçerli bir CVV giriniz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form gönderme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const cardData = {
        ...formData,
        card_no: formData.card_no.replace(/\s/g, ''),
        expire_month: parseInt(formData.expire_month),
        expire_year: parseInt(formData.expire_year)
      };
      
      // CVV'yi API'ye gönderme (güvenlik nedeniyle)
      delete (cardData as any).cvv;
      
      if (initialData?.id) {
        // Mevcut kartı güncelle
        await dispatch(updateCard({ ...cardData, id: initialData.id }));
      } else {
        // Yeni kart ekle
        await dispatch(addCard(cardData));
      }
      
      onSuccess();
    } catch (error) {
      console.error('Kart kaydedilirken hata oluştu:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Ay seçenekleri
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return (
      <option key={month} value={month}>
        {month < 10 ? `0${month}` : month}
      </option>
    );
  });
  
  // Yıl seçenekleri
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => {
    const year = currentYear + i;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  });
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="card_no" className="block text-sm font-medium text-gray-700 mb-1">
          Kart Numarası
        </label>
        <input
          type="text"
          id="card_no"
          name="card_no"
          value={formData.card_no}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${errors.card_no ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="1234 5678 9012 3456"
        />
        {errors.card_no && <p className="mt-1 text-sm text-red-500">{errors.card_no}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name_on_card" className="block text-sm font-medium text-gray-700 mb-1">
            Kart Üzerindeki İsim
          </label>
          <input
            type="text"
            id="name_on_card"
            name="name_on_card"
            value={formData.name_on_card}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.name_on_card ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Ad Soyad"
          />
          {errors.name_on_card && <p className="mt-1 text-sm text-red-500">{errors.name_on_card}</p>}
        </div>
        
        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="123"
            disabled={!!initialData} // Düzenleme modunda CVV alanını devre dışı bırak
          />
          {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Son Kullanma Tarihi
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <select
              name="expire_month"
              value={formData.expire_month}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.expire_month ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Ay</option>
              {monthOptions}
            </select>
            {errors.expire_month && <p className="mt-1 text-sm text-red-500">{errors.expire_month}</p>}
          </div>
          
          <div>
            <select
              name="expire_year"
              value={formData.expire_year}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.expire_year ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Yıl</option>
              {yearOptions}
            </select>
            {errors.expire_year && <p className="mt-1 text-sm text-red-500">{errors.expire_year}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="save_card"
          className="w-4 h-4 text-[#F27A1A] border-gray-300 rounded focus:ring-[#F27A1A]"
        />
        <label htmlFor="save_card" className="ml-2 text-sm text-gray-700">
          Bu kartı kaydet
        </label>
      </div>
      
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="secure_payment"
          className="w-4 h-4 text-[#F27A1A] border-gray-300 rounded focus:ring-[#F27A1A]"
        />
        <label htmlFor="secure_payment" className="ml-2 text-sm text-gray-700">
          3D Secure ile ödemek istiyorum
        </label>
      </div>
      
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
          className="px-4 py-2 bg-[#F27A1A] text-white rounded-md hover:bg-[#e06c10] disabled:opacity-50"
        >
          {isSubmitting ? 'Kaydediliyor...' : initialData ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
} 