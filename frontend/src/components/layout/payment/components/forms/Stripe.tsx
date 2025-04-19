'use client';

import { useProtectedRoute } from '@/lib/hooks/useProtectedRoute';
import { useCartStore } from "@/lib/store/cartStore";
import { useState } from 'react';
import { useCreateOrder } from '@/lib/hooks/useOrders';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import successAnimation from '../../../../../../public/lottiefiles/Delivery.json'; // Make sure to add this file

// Define types for our component
type Country = 'United States' | 'Canada' | 'United Kingdom' | 'Germany' | 'France';
type CardType = 'Visa' | 'MasterCard' | 'American Express' | 'Discover';

type StatesType = {
  [key in Country]: string[];
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
};

const countries: Country[] = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France'];
const states: StatesType = {
  'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
  'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  'Germany': ['Bavaria', 'Berlin', 'Hamburg', 'Hesse'],
  'France': ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes']
};
const cardTypes: CardType[] = ['Visa', 'MasterCard', 'American Express', 'Discover'];

const StripeForm = () => {
  const { loading: authLoading, user } = useProtectedRoute();
  const [selectedCountry, setSelectedCountry] = useState<Country | ''>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<CardType | ''>('');
  const { items, total, clearCart } = useCartStore();
  const createOrder = useCreateOrder();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'country' && (countries.includes(value as Country) || value === '')) {
      setSelectedCountry(value as Country | '');
      return;
    }
    
    if (name === 'cardType' && (cardTypes.includes(value as CardType) || value === '')) {
      setSelectedCard(value as CardType | '');
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCountry || !selectedState || !selectedCard) {
      setError('Please fill all required fields');
      return;
    }
    
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const order = await createOrder.mutateAsync({
        user: user?.id || 0,
        items: items.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total,
      });
      
      setOrderId(order.id);
      clearCart();
      setShowSuccess(true);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment processing failed');
      setIsProcessing(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
          <div className="w-64 h-64 mx-auto">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order #{orderId} has been placed successfully.
          </p>
          <p className="text-gray-500 text-sm">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Country</label>
            <select
              name="country"
              value={selectedCountry}
              onChange={handleInputChange}
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
              name="state"
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
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="123 Main St"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Card Type</label>
            <select
              name="cardType"
              value={selectedCard}
              onChange={handleInputChange}
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
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
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
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Name on Card</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
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
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing || items.length === 0}
            className={`w-full mt-6 text-white py-3 px-4 rounded-lg font-medium transition duration-200 shadow-md ${
              isProcessing || items.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {isProcessing ? 'Processing...' : `Pay Now $${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripeForm;