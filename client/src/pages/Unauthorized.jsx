import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <h1 className="mt-4 text-6xl font-bold text-red-500 mb-2">403</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-lg text-gray-600 mb-8">
          You do not have the necessary permissions to view this page.
        </p>
        <div className="space-x-4">
          <Link
            to="/dashboard" // Link to dashboard or home depending on typical user flow
            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Go to Dashboard
          </Link>
           <Link
            to="/"
            className="inline-flex items-center px-5 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 