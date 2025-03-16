'use client';

import { useState } from 'react';
import { Edit, Trash2, Plus, CreditCard, Info } from 'lucide-react';
import { CreditCardFormData } from './CreditCardForm';

interface CreditCardListProps {
  cards: any[];
  selectedCardId?: number;
  onSelect: (cardId: number) => void;
  onEdit: (card: any) => void;
  onDelete: (cardId: number) => void;
  onAddNew: () => void;
}

export default function CreditCardList({
  cards,
  selectedCardId,
  onSelect,
  onEdit,
  onDelete,
  onAddNew
}: CreditCardListProps) {
  // Confirm delete modal state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<number | null>(null);

  const handleDeleteClick = (cardId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection
    setCardToDelete(cardId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (cardToDelete !== null) {
      onDelete(cardToDelete);
      setShowDeleteConfirm(false);
      setCardToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setCardToDelete(null);
  };

  // Format card number for display (show only last 4 digits)
  const formatCardNumber = (cardNumber: string) => {
    const lastFourDigits = cardNumber.slice(-4);
    return `**** **** **** ${lastFourDigits}`;
  };

  // Get card type based on first digit
  const getCardType = (cardNumber: string) => {
    const firstDigit = cardNumber.charAt(0);
    
    switch (firstDigit) {
      case '4':
        return 'Visa';
      case '5':
        return 'MasterCard';
      case '3':
        return 'American Express';
      case '6':
        return 'Discover';
      default:
        return 'Kredi Kartı';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Kayıtlı Kartlarım</h2>
        <button
          onClick={onAddNew}
          className="flex items-center text-[#23A6F0] hover:text-[#1a7ac0]"
        >
          <Plus className="w-4 h-4 mr-1" />
          Yeni Kart Ekle
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">Henüz kayıtlı kartınız bulunmamaktadır.</p>
          <button
            onClick={onAddNew}
            className="mt-4 px-4 py-2 bg-[#23A6F0] text-white rounded-md hover:bg-[#1a7ac0]"
          >
            Kart Ekle
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelect(card.id)}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedCardId === card.id
                  ? 'border-[#23A6F0] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{getCardType(card.card_no)}</h3>
                    {selectedCardId === card.id && (
                      <span className="ml-2 text-xs bg-[#23A6F0] text-white px-2 py-0.5 rounded-full">
                        Seçili
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mt-1">
                    {formatCardNumber(card.card_no)}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{card.name_on_card}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Son Kullanma: {card.expire_month < 10 ? `0${card.expire_month}` : card.expire_month}/{card.expire_year}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(card);
                    }}
                    className="p-1.5 text-gray-500 hover:text-[#23A6F0] hover:bg-gray-100 rounded-full"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(card.id, e)}
                    className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3D Secure Info */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-[#23A6F0] mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-900">3D Secure ile Güvenli Ödeme</h3>
            <p className="text-sm text-gray-600 mt-1">
              Kartınızla yapacağınız ödemeler 3D Secure teknolojisi ile korunmaktadır. 
              Ödeme sırasında bankanız tarafından gönderilen doğrulama kodunu girmeniz gerekecektir.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-4">Kartı Sil</h3>
            <p className="text-gray-600 mb-6">
              Bu kartı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 