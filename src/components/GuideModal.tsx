import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Guide {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  status: 'active' | 'inactive';
  country: string;
  visitsCount: number;
}

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guide: Omit<Guide, 'id' | 'visitsCount'>) => void;
  guide?: Guide | null;
}

const countries = [
  'France', 'Italie', 'Espagne', 'Allemagne', 'Royaume-Uni', 
  'Portugal', 'Grèce', 'Pays-Bas', 'Belgique', 'Suisse'
];

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose, onSave, guide }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    photo: '',
    status: 'active' as 'active' | 'inactive',
    country: ''
  });

  useEffect(() => {
    if (guide) {
      setFormData({
        firstName: guide.firstName,
        lastName: guide.lastName,
        photo: guide.photo,
        status: guide.status,
        country: guide.country
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        photo: '',
        status: 'active',
        country: ''
      });
    }
  }, [guide, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {guide ? 'Modifier le guide' : 'Ajouter un guide'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 input-field"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 input-field"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo (URL)
                </label>
                <input
                  type="url"
                  className="mt-1 input-field"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pays d'affectation
                </label>
                <select
                  required
                  className="mt-1 input-field"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="">Sélectionner un pays</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Statut
                </label>
                <select
                  className="mt-1 input-field"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {guide ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;