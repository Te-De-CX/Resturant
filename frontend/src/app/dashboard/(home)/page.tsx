// app/dashboard/page.tsx
'use client';

import { useCurrentUser } from '@/lib/api/auth';

export default function Dashboard() {
  const { data: user } = useCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        {user && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Welcome, {user.username}!
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="font-medium text-amber-800">Account Details</h3>
                <div className="mt-4 space-y-2 text-sm">
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-medium text-blue-800">Recent Activity</h3>
                {/* Add user activity here */}
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-medium text-green-800">Quick Actions</h3>
                {/* Add quick actions here */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}