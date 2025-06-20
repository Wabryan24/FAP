import React, { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  present: boolean;
  comment: string;
}

interface Visit {
  id: string;
  photo: string;
  country: string;
  location: string;
  date: string;
  startTime: string;
  duration: number;
  endTime: string;
  guideId: string;
  guideName: string;
  visitors: Visitor[];
  generalComment: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface VisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (visit: Omit<Visit, 'id'>) => void;
  visit?: Visit | null;
}

const mockGuides = [
  { id: '1', name: 'Marie Dubois' },
  { id: '2', name: 'Marco Rossi' },
  { id: '3', name: 'Carlos Garcia' },
];

const countries = [
  'France', 'Italie', 'Espagne', 'Allemagne', 'Royaume-Uni', 
  'Portugal', 'Grèce', 'Pays-Bas', 'Belgique', 'Suisse'
];

const VisitModal: React.FC<VisitModalProps> = ({ isOpen, onClose, onSave, visit }) => {
  const [formData, setFormData] = useState({
    photo: '',
    country: '',
    location: '',
    date: '',
    startTime: '',
    duration: 2,
    guideId: '',
    generalComment: '',
    status: 'scheduled' as 'scheduled' | 'in-progress' | 'completed'
  });
  
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    if (visit) {
      setFormData({
        photo: visit.photo,
        country: visit.country,
        location: visit.location,
        date: visit.date,
        startTime: visit.startTime,
        duration: visit.duration,
        guideId: visit.guideId,
        generalComment: visit.generalComment,
        status: visit.status
      });
      setVisitors(visit.visitors);
    } else {
      setFormData({
        photo: '',
        country: '',
        location: '',
        date: '',
        startTime: '',
        duration: 2,
        guideId: '',
        generalComment: '',
        status: 'scheduled'
      });
      setVisitors([]);
    }
  }, [visit, isOpen]);

  const calculateEndTime = (startTime: string, duration: number) => {
    if (!startTime) return '';
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + duration;
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const addVisitor = () => {
    if (visitors.length < 15) {
      setVisitors([...visitors, {
        id: Date.now().toString(),
        firstName: '',
        lastName: '',
        present: true,
        comment: ''
      }]);
    }
  };

  const removeVisitor = (id: string) => {
    setVisitors(visitors.filter(v => v.id !== id));
  };

  const updateVisitor = (id: string, field: keyof Visitor, value: any) => {
    setVisitors(visitors.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedGuide = mockGuides.find(g => g.id === formData.guideId);
    
    onSave({
      ...formData,
      endTime: calculateEndTime(formData.startTime, formData.duration),
      guideName: selectedGuide?.name || '',
      visitors
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {visit ? 'Modifier la visite' : 'Ajouter une visite'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo (URL)
                  </label>
                  <input
                    type="url"
                    className="mt-1 input-field"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pays
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lieu de visite
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 input-field"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="mt-1 input-field"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Heure de début
                  </label>
                  <input
                    type="time"
                    required
                    className="mt-1 input-field"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Durée (heures)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    required
                    className="mt-1 input-field"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Guide affecté
                  </label>
                  <select
                    required
                    className="mt-1 input-field"
                    value={formData.guideId}
                    onChange={(e) => setFormData({ ...formData, guideId: e.target.value })}
                  >
                    <option value="">Sélectionner un guide</option>
                    {mockGuides.map((guide) => (
                      <option key={guide.id} value={guide.id}>
                        {guide.name}
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
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="scheduled">Programmée</option>
                    <option value="in-progress">En cours</option>
                    <option value="completed">Terminée</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Visiteurs ({visitors.length}/15)
                  </label>
                  <button
                    type="button"
                    onClick={addVisitor}
                    disabled={visitors.length >= 15}
                    className="btn-primary text-sm py-1 px-2 disabled:opacity-50"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Ajouter
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {visitors.map((visitor) => (
                    <div key={visitor.id} className="flex items-center space-x-2 p-2 border rounded">
                      <input
                        type="text"
                        placeholder="Prénom"
                        className="flex-1 input-field text-sm"
                        value={visitor.firstName}
                        onChange={(e) => updateVisitor(visitor.id, 'firstName', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Nom"
                        className="flex-1 input-field text-sm"
                        value={visitor.lastName}
                        onChange={(e) => updateVisitor(visitor.id, 'lastName', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeVisitor(visitor.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Commentaire général
                </label>
                <textarea
                  rows={3}
                  className="mt-1 input-field"
                  value={formData.generalComment}
                  onChange={(e) => setFormData({ ...formData, generalComment: e.target.value })}
                />
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
                  {visit ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitModal;