import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import VisitModal from '../components/VisitModal';
import VisitDetailsModal from '../components/VisitDetailsModal';
import toast from 'react-hot-toast';

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

const mockVisits: Visit[] = [
  {
    id: '1',
    photo: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=300',
    country: 'France',
    location: 'Tour Eiffel',
    date: '2024-01-15',
    startTime: '14:00',
    duration: 2,
    endTime: '16:00',
    guideId: '1',
    guideName: 'Marie Dubois',
    visitors: [
      { id: '1', firstName: 'Jean', lastName: 'Martin', present: true, comment: 'Très intéressé' },
      { id: '2', firstName: 'Sophie', lastName: 'Durand', present: true, comment: '' },
    ],
    generalComment: 'Excellente visite, groupe très participatif',
    status: 'completed'
  },
  {
    id: '2',
    photo: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=300',
    country: 'Italie',
    location: 'Colisée',
    date: '2024-01-16',
    startTime: '10:00',
    duration: 3,
    endTime: '13:00',
    guideId: '2',
    guideName: 'Marco Rossi',
    visitors: [
      { id: '3', firstName: 'Pierre', lastName: 'Blanc', present: false, comment: 'Absent' },
      { id: '4', firstName: 'Marie', lastName: 'Rouge', present: true, comment: 'Passionnée d\'histoire' },
    ],
    generalComment: '',
    status: 'scheduled'
  },
];

const Visits: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>(mockVisits);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const handleAddVisit = () => {
    setEditingVisit(null);
    setIsModalOpen(true);
  };

  const handleEditVisit = (visit: Visit) => {
    setEditingVisit(visit);
    setIsModalOpen(true);
  };

  const handleViewVisit = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteVisit = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette visite ?')) {
      setVisits(visits.filter(visit => visit.id !== id));
      toast.success('Visite supprimée avec succès');
    }
  };

  const handleSaveVisit = (visitData: Omit<Visit, 'id'>) => {
    if (editingVisit) {
      setVisits(visits.map(visit => 
        visit.id === editingVisit.id 
          ? { ...visit, ...visitData }
          : visit
      ));
      toast.success('Visite modifiée avec succès');
    } else {
      const newVisit: Visit = {
        ...visitData,
        id: Date.now().toString()
      };
      setVisits([...visits, newVisit]);
      toast.success('Visite ajoutée avec succès');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visites</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez les visites touristiques et leurs participants
          </p>
        </div>
        <button
          onClick={handleAddVisit}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter une visite
        </button>
      </div>

      <div className="card">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lieu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guide
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={visit.photo}
                          alt={visit.location}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {visit.location}
                        </div>
                        <div className="text-sm text-gray-500">{visit.country}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visit.guideName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      {new Date(visit.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-gray-500">
                      {visit.startTime} - {visit.endTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visit.visitors.length}/15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      visit.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : visit.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {visit.status === 'completed' ? 'Terminée' : 
                       visit.status === 'in-progress' ? 'En cours' : 'Programmée'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleViewVisit(visit)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEditVisit(visit)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteVisit(visit.id)}
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

      <VisitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVisit}
        visit={editingVisit}
      />

      <VisitDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        visit={selectedVisit}
      />
    </div>
  );
};

export default Visits;