import React from 'react';
import {
  UserGroupIcon,
  MapPinIcon,
  UsersIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Guides actifs',
    value: '24',
    icon: UserGroupIcon,
    change: '+2',
    changeType: 'positive',
  },
  {
    name: 'Visites ce mois',
    value: '156',
    icon: MapPinIcon,
    change: '+12%',
    changeType: 'positive',
  },
  {
    name: 'Touristes',
    value: '1,847',
    icon: UsersIcon,
    change: '+8%',
    changeType: 'positive',
  },
  {
    name: 'Taux de présence',
    value: '92%',
    icon: ChartBarIcon,
    change: '+3%',
    changeType: 'positive',
  },
];

const recentVisits = [
  {
    id: 1,
    location: 'Tour Eiffel',
    country: 'France',
    guide: 'Marie Dubois',
    date: '2024-01-15',
    time: '14:00',
    participants: 12,
    status: 'completed'
  },
  {
    id: 2,
    location: 'Colisée',
    country: 'Italie',
    guide: 'Marco Rossi',
    date: '2024-01-15',
    time: '16:30',
    participants: 8,
    status: 'in-progress'
  },
  {
    id: 3,
    location: 'Sagrada Familia',
    country: 'Espagne',
    guide: 'Carlos Garcia',
    date: '2024-01-16',
    time: '10:00',
    participants: 15,
    status: 'scheduled'
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-gray-500">
          Vue d'ensemble de votre activité TravelParadise
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent visits */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Visites récentes</h2>
          <a href="/visits" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            Voir tout
          </a>
        </div>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentVisits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {visit.location}
                      </div>
                      <div className="text-sm text-gray-500">{visit.country}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visit.guide}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(visit.date).toLocaleDateString('fr-FR')} à {visit.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visit.participants}/15
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;