'use client';

import { useProtectedRoute } from '@/lib/hooks/useProtectedRoute';
import { useCartStore } from "@/lib/store/cartStore";
import { useState } from 'react';

const StripeForm = () => {
  const { loading, user } = useProtectedRoute();
  const { total } = useCartStore();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCard, setSelectedCard] = useState('');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Sample data for dropdowns
  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France'];
  const states = {
    'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Germany': ['Bavaria', 'Berlin', 'Hamburg', 'Hesse'],
    'France': ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes']
  };
  const cardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h2>
      <form id="payment-form" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">First Name</label>
            <input 
              type="text" 
              placeholder="John" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            //   defaultValue={user?.firstName || ''}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Last Name</label>
            <input 
              type="text" 
              placeholder="Doe" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            //   defaultValue={user?.lastName || ''}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            defaultValue={user?.email || ''}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">State/Province</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {selectedCountry && states[selectedCountry]?.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
          <input 
            type="text" 
            placeholder="123 Main St" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Card Type</label>
            <select
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            >
              <option value="">Select Card</option>
              {cardTypes.map(card => (
                <option key={card} value={card}>{card}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Card Number</label>
            <input 
              type="text" 
              placeholder="4242 4242 4242 4242" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Expiry Date</label>
            <input 
              type="text" 
              placeholder="MM/YY" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">CVV</label>
            <input 
              type="text" 
              placeholder="123" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Name on Card</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Discount:</span>
            <span className="font-medium text-green-600">$0.00</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold text-gray-800">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-lg"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripeForm;