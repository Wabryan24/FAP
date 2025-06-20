import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import GuideModal from '../components/GuideModal';
import toast from 'react-hot-toast';

interface Guide {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  status: 'active' | 'inactive';
  country: string;
  visitsCount: number;
}

const mockGuides: Guide[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dubois',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'active',
    country: 'France',
    visitsCount: 24
  },
  {
    id: '2',
    firstName: 'Marco',
    lastName: 'Rossi',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'active',
    country: 'Italie',
    visitsCount: 18
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Garcia',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'inactive',
    country: 'Espagne',
    visitsCount: 12
  },
];

const Guides: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>(mockGuides);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);

  const handleAddGuide = () => {
    setEditingGuide(null);
    setIsModalOpen(true);
  };

  const handleEditGuide = (guide: Guide) => {
    setEditingGuide(guide);
    setIsModalOpen(true);
  };

  const handleDeleteGuide = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce guide ?')) {
      setGuides(guides.filter(guide => guide.id !== id));
      toast.success('Guide supprimé avec succès');
    }
  };

  const handleSaveGuide = (guideData: Omit<Guide, 'id' | 'visitsCount'>) => {
    if (editingGuide) {
      setGuides(guides.map(guide => 
        guide.id === editingGuide.id 
          ? { ...guide, ...guideData }
          : guide
      ));
      toast.success('Guide modifié avec succès');
    } else {
      const newGuide: Guide = {
        ...guideData,
        id: Date.now().toString(),
        visitsCount: 0
      };
      setGuides([...guides, newGuide]);
      toast.success('Guide ajouté avec succès');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guides touristiques</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos guides touristiques et leurs affectations
          </p>
        </div>
        <button
          onClick={handleAddGuide}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un guide
        </button>
      </div>

      <div className="card">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guide
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pays d'affectation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visites
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guides.map((guide) => (
                <tr key={guide.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={guide.photo}
                          alt={`${guide.firstName} ${guide.lastName}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {guide.firstName} {guide.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guide.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      guide.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {guide.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {guide.visitsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditGuide(guide)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteGuide(guide.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <GuideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGuide}
        guide={editingGuide}
      />
    </div>
  );
};

export default Guides;