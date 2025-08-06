import React from 'react';
import { History, Package, Heart } from 'lucide-react';

const DonationHistory: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <History className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Donation History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your giving and receiving activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donations Made */}
          <div className="card">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Heart className="h-6 w-6 text-red-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Donations Made
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No donations made yet
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Start donating to help your community!
                </p>
              </div>
            </div>
          </div>

          {/* Donations Received */}
          <div className="card">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Package className="h-6 w-6 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Donations Received
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No donations received yet
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Browse available donations to get started!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            History Features (Coming Soon)
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>• Track all your donation activities</p>
            <p>• View status updates and delivery confirmations</p>
            <p>• Export donation receipts for tax purposes</p>
            <p>• Rate and review your donation experiences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;