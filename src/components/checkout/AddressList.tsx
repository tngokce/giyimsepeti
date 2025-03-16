'use client';

import { useState } from 'react';
import { Edit, Trash2, Plus, MapPin } from 'lucide-react';
import { AddressFormData } from './AddressForm';

interface AddressListProps {
  addresses: any[];
  selectedAddressId?: number;
  onSelect: (addressId: number) => void;
  onEdit: (address: any) => void;
  onDelete: (addressId: number) => void;
  onAddNew: () => void;
}

export default function AddressList({
  addresses,
  selectedAddressId,
  onSelect,
  onEdit,
  onDelete,
  onAddNew
}: AddressListProps) {
  // Confirm delete modal state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

  const handleDeleteClick = (addressId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent address selection
    setAddressToDelete(addressId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (addressToDelete !== null) {
      onDelete(addressToDelete);
      setShowDeleteConfirm(false);
      setAddressToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setAddressToDelete(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Kayıtlı Adreslerim</h2>
        <button
          onClick={onAddNew}
          className="flex items-center text-[#23A6F0] hover:text-[#1a7ac0]"
        >
          <Plus className="w-4 h-4 mr-1" />
          Yeni Adres Ekle
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">Henüz kayıtlı adresiniz bulunmamaktadır.</p>
          <button
            onClick={onAddNew}
            className="mt-4 px-4 py-2 bg-[#23A6F0] text-white rounded-md hover:bg-[#1a7ac0]"
          >
            Adres Ekle
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              onClick={() => onSelect(address.id)}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedAddressId === address.id
                  ? 'border-[#23A6F0] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{address.title}</h3>
                    {selectedAddressId === address.id && (
                      <span className="ml-2 text-xs bg-[#23A6F0] text-white px-2 py-0.5 rounded-full">
                        Seçili
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mt-1">
                    {address.name} {address.surname}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{address.phone}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    {address.neighborhood}, {address.district}, {address.city}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(address);
                    }}
                    className="p-1.5 text-gray-500 hover:text-[#23A6F0] hover:bg-gray-100 rounded-full"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(address.id, e)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-4">Adresi Sil</h3>
            <p className="text-gray-600 mb-6">
              Bu adresi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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