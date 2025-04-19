'use client';

import { useCurrentUser } from '@/lib/api/auth';
import { FiUser, FiMail, FiMapPin, FiCreditCard, FiSettings, FiKey, FiEdit } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const ProfilePage = () => {
  const { data: user } = useCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative h-32 w-32 rounded-full border-4 border-white shadow-lg mb-4">
            {user?.image ? (
              <Image
                src={user.image}
                alt={`${user?.name}'s profile`}
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-yellow-400 flex text-center items-center justify-center rounded-full">
                <FiUser className="text-white text-5xl" />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.name} {user?.surname}
          </h1>
          <p className="text-lg text-gray-600 mt-2">{user?.email}</p>
          <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
            <FiEdit className="text-blue-500" />
            Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <FiUser className="text-blue-500 text-lg" />
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiUser className="text-blue-500 text-sm" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">
                      {user?.first_name} {user?.last_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <FiMail className="text-purple-500 text-sm" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FiMapPin className="text-green-500 text-sm" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">
                      {user?.address || 'No address provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-[#191919] rounded-xl shadow-lg overflow-hidden relative h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0"></div>
              <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Amount Spent</p>
                    <p className="text-2xl font-bold">$00.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Expires</p>
                    <p className="font-medium">12/25</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Card Number</p>
                    <p className="text-lg font-mono tracking-wider">•••• •••• •••• 4242</p>
                  </div>
                  <div className="text-3xl">💳</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-medium text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <FiUser className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Profile Information</p>
                    <p className="text-sm text-gray-500">Update your personal details</p>
                  </div>
                </Link>

                <Link
                  href="/profile/change-password"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <FiKey className="text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-500">Manage your account security</p>
                  </div>
                </Link>

                <Link
                  href="/profile/address"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <FiMapPin className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Address Book</p>
                    <p className="text-sm text-gray-500">Manage your saved addresses</p>
                  </div>
                </Link>

                <Link
                  href="/profile/payment-methods"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <FiCreditCard className="text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Payment Methods</p>
                    <p className="text-sm text-gray-500">Add or update payment options</p>
                  </div>
                </Link>

                <Link
                  href="/profile/settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <FiSettings className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Account Settings</p>
                    <p className="text-sm text-gray-500">Configure your preferences</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity (optional) */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mt-1">
                    <FiCreditCard className="text-blue-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payment processed</p>
                    <p className="text-xs text-gray-500">Today, 10:42 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mt-1">
                    <FiUser className="text-green-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Profile updated</p>
                    <p className="text-xs text-gray-500">Yesterday, 3:15 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;