import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const monthlyVisitsData = [
  { month: 'Jan', visits: 45, guides: { 'Marie Dubois': 18, 'Marco Rossi': 15, 'Carlos Garcia': 12 } },
  { month: 'Fév', visits: 52, guides: { 'Marie Dubois': 20, 'Marco Rossi': 18, 'Carlos Garcia': 14 } },
  { month: 'Mar', visits: 48, guides: { 'Marie Dubois': 19, 'Marco Rossi': 16, 'Carlos Garcia': 13 } },
  { month: 'Avr', visits: 61, guides: { 'Marie Dubois': 24, 'Marco Rossi': 20, 'Carlos Garcia': 17 } },
  { month: 'Mai', visits: 55, guides: { 'Marie Dubois': 22, 'Marco Rossi': 18, 'Carlos Garcia': 15 } },
  { month: 'Jun', visits: 67, guides: { 'Marie Dubois': 26, 'Marco Rossi': 22, 'Carlos Garcia': 19 } },
];

const attendanceData = [
  { month: 'Jan', rate: 88 },
  { month: 'Fév', rate: 92 },
  { month: 'Mar', rate: 85 },
  { month: 'Avr', rate: 94 },
  { month: 'Mai', rate: 90 },
  { month: 'Jun', rate: 96 },
];

const guidePerformanceData = [
  { name: 'Marie Dubois', visits: 129, color: '#0ea5e9' },
  { name: 'Marco Rossi', visits: 109, color: '#8b5cf6' },
  { name: 'Carlos Garcia', visits: 90, color: '#10b981' },
];

const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b'];

const Statistics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
          <p className="mt-1 text-sm text-gray-500">
            Analysez les performances de vos visites et guides
          </p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="input-field w-auto"
        >
          <option value="3months">3 derniers mois</option>
          <option value="6months">6 derniers mois</option>
          <option value="1year">1 an</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">V</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total visites</p>
              <p className="text-2xl font-semibold text-gray-900">328</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold">%</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Taux de présence moyen</p>
              <p className="text-2xl font-semibold text-gray-900">91%</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold">G</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Guides actifs</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-semibold">T</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Touristes accueillis</p>
              <p className="text-2xl font-semibold text-gray-900">3,847</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Visits Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Visites par mois</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyVisitsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Rate Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Taux de présence par mois</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[80, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Taux de présence']} />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Guide Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance des guides</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={guidePerformanceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="visits" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Répartition des visites</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={guidePerformanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="visits"
              >
                {guidePerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Statistics Table */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques détaillées par guide</h3>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guide
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visites totales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Moyenne mensuelle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taux de présence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Évaluation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Marie Dubois
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">129</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">21.5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">94%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Excellent
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Marco Rossi
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">109</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">18.2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">91%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Très bien
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Carlos Garcia
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">90</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15.0</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">88%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Bien
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;