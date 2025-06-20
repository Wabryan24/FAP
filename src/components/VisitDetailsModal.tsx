import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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

interface VisitDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: Visit | null;
}

const VisitDetailsModal: React.FC<VisitDetailsModalProps> = ({ isOpen, onClose, visit }) => {
  if (!isOpen || !visit) return null;

  const presentCount = visit.visitors.filter(v => v.present).length;
  const attendanceRate = visit.visitors.length > 0 ? (presentCount / visit.visitors.length) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Détails de la visite
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Visit Info */}
              <div className="flex items-start space-x-4">
                {visit.photo && (
                  <img
                    src={visit.photo}
                    alt={visit.location}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900">{visit.location}</h4>
                  <p className="text-gray-600">{visit.country}</p>
                  <div className="mt-2 space-y-1 text-sm text-gray-500">
                    <p>Date: {new Date(visit.date).toLocaleDateString('fr-FR')}</p>
                    <p>Horaire: {visit.startTime} - {visit.endTime} ({visit.duration}h)</p>
                    <p>Guide: {visit.guideName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    visit.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : visit.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {visit.status === 'completed' ? 'Terminée' : 
                     visit.status === 'in-progress' ? 'En cours' : 'Programmée'}
                  </span>
                </div>
              </div>

              {/* Attendance Stats */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Statistiques de présence</h5>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">{visit.visitors.length}</div>
                    <div className="text-sm text-gray-500">Inscrits</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                    <div className="text-sm text-gray-500">Présents</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{attendanceRate.toFixed(0)}%</div>
                    <div className="text-sm text-gray-500">Taux de présence</div>
                  </div>
                </div>
              </div>

              {/* Visitors List */}
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Liste des visiteurs</h5>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Nom
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Présence
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Commentaire
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {visit.visitors.map((visitor) => (
                        <tr key={visitor.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {visitor.firstName} {visitor.lastName}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              visitor.present 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {visitor.present ? 'Présent' : 'Absent'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {visitor.comment || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* General Comment */}
              {visit.generalComment && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Commentaire général</h5>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{visit.generalComment}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-6">
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitDetailsModal;