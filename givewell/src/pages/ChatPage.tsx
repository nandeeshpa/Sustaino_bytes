import React from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const ChatPage: React.FC = () => {
  const { donationId } = useParams<{ donationId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Chat Page
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time chat for donation ID: {donationId}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            This feature will be implemented with Firebase Realtime Database
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;