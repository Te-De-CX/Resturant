"use client"

import { FaExclamationTriangle, FaHome, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <FaExclamationTriangle className="text-red-500 text-4xl" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-800 mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            <FaHome /> Go Home
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            <FaSearch /> Go Back
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-gray-500 text-sm">
        Still lost? Contact us at support@tunjiheritage@gmail.com
      </p>
    </div>
  );
};

export default Error;