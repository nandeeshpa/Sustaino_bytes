import React from 'react';
import { Shield, FileText, Upload } from 'lucide-react';

const NGOVerification: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            NGO Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Apply to become a verified NGO partner
          </p>
        </div>

        <div className="card p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                NGO Registration Number
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your NGO registration number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Organization Address
              </label>
              <textarea
                rows={3}
                className="input-field resize-none"
                placeholder="Enter your organization's complete address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Proof Document
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">
                  Upload registration certificate or other proof documents
                </p>
                <button className="btn-outline mt-2">
                  Choose File
                </button>
              </div>
            </div>

            <button className="w-full btn-primary py-3">
              Submit Application
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Verification Process
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Your application will be reviewed by our admin team. Verified NGOs get special badges and enhanced visibility on the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOVerification;