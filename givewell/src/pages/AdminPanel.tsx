import React from 'react';
import { Shield, Users, Package, CheckCircle } from 'lucide-react';

const AdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage users, donations, and NGO verifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">1,234</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
          </div>
          <div className="card p-6 text-center">
            <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">567</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Donations</div>
          </div>
          <div className="card p-6 text-center">
            <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">89</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Verified NGOs</div>
          </div>
          <div className="card p-6 text-center">
            <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending Reviews</div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Admin Features (Coming Soon)
          </h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <p>• User management and moderation</p>
            <p>• Donation oversight and flagging</p>
            <p>• NGO verification workflow</p>
            <p>• Analytics and reporting</p>
            <p>• System configuration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;