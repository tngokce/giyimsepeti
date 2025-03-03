'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteAddress } from '@/redux/actions/addressActions';

interface AddressCardProps {
  address: any;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

export default function AddressCard({ address, isSelected, onSelect, onEdit }: AddressCardProps) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (confirm('Bu adresi silmek istediğinize emin misiniz?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteAddress(address.id));
      } catch (error) {
        console.error('Adres silinirken hata oluştu:', error);
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
          <h3 className="font-medium">{address.title}</h3>
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
        <p>{address.name} {address.surname}</p>
        <p className="mt-1">{address.neighborhood}</p>
        <p className="mt-1">{address.district} / {address.city.toUpperCase()}</p>
        <p className="mt-1">{address.phone}</p>
      </div>
    </div>
  );
} 