import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const MapView: React.FC = () => {
  const mockNGOs = [
    { id: 1, name: 'Hope Foundation', address: '123 Main St, Chennai', distance: '0.5 km', verified: true },
    { id: 2, name: 'Care Society', address: '456 Park Ave, Chennai', distance: '1.2 km', verified: true },
    { id: 3, name: 'Help Center', address: '789 Oak Rd, Chennai', distance: '2.1 km', verified: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <MapPin className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Map View
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find nearby NGOs and donation pickup points
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="card p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Interactive Map
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Map integration with Leaflet.js or Google Maps would be implemented here
                </p>
                <button className="btn-primary mt-4 inline-flex items-center">
                  <Navigation className="h-5 w-5 mr-2" />
                  Detect My Location
                </button>
              </div>
            </div>
          </div>

          {/* Nearby NGOs */}
          <div>
            <div className="card">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Nearby NGOs
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockNGOs.map((ngo) => (
                  <div key={ngo.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {ngo.name}
                          </h3>
                          {ngo.verified && (
                            <span className="ml-2 text-blue-600 text-sm">✅</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {ngo.address}
                        </p>
                        <span className="text-xs text-primary-600 font-medium">
                          {ngo.distance} away
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-3 btn-outline text-sm py-2">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="card p-6 mt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Map Legend
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Available Donations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Verified NGOs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Your Location</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;