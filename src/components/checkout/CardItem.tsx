'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pencil, Trash2, CreditCard } from 'lucide-react';
import { deleteCard } from '@/redux/actions/paymentActions';

interface CardItemProps {
  card: any;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

export default function CardItem({ card, isSelected, onSelect, onEdit }: CardItemProps) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Kart numarasını maskeleme (sadece son 4 haneyi göster)
  const maskCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    const last4Digits = cardNumber.slice(-4);
    return `**** **** **** ${last4Digits}`;
  };
  
  const handleDelete = async () => {
    if (confirm('Bu kartı silmek istediğinize emin misiniz?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteCard(card.id));
      } catch (error) {
        console.error('Kart silinirken hata oluştu:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <div 
      className={`border rounded-md p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-[#F27A1A] bg-orange-50' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
            isSelected ? 'border-[#F27A1A] bg-[#F27A1A]' : 'border-gray-400'
          }`}>
            {isSelected && (
              <div className="w-2 h-2 rounded-full bg-white"></div>
            )}
          </div>
          <CreditCard className="w-6 h-6 text-gray-600 mr-2" />
          <h3 className="font-medium">{card.name_on_card}</h3>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            disabled={isDeleting}
            className="p-1 text-gray-500 hover:text-red-500 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-600">
        <p>{maskCardNumber(card.card_no)}</p>
        <p className="mt-1">Son Kullanma: {card.expire_month < 10 ? `0${card.expire_month}` : card.expire_month}/{card.expire_year}</p>
      </div>
    </div>
  );
} 