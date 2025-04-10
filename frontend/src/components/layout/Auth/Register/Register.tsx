'use client';

import Image from 'next/image';
import HeroImg from '../../../../../public/images/auth/register/bg.jpg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRegister } from '@/lib/api/auth';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
};

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
  });
  
  const router = useRouter();
  const { mutate: register, isLoading } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim() || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    toast.promise(
      register(formData, {
        onSuccess: () => {
          router.push('/dashboard');
        },
      }),
      {
        loading: 'Creating your account...',
        success: 'Registration successful! Redirecting...',
        error: (err: Error) => err.message || 'Registration failed. Please try again.',
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4">
      {/* Full-page Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImg}
          alt="Food background"
          className="object-cover"
          quality={100}
          priority
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Glassy Registration Form */}
          <div className="backdrop-blur-md bg-white/10 p-8 sm:p-10 rounded-xl border border-white/20 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h3>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  name="username"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full px-5 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              
              <div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              
              <div>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-5 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <p className="text-white/80 text-sm">Already have an account?</p>
                <Link 
                  href="/login" 
                  className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-3 px-4 ${
                  isLoading 
                    ? 'bg-amber-600 cursor-not-allowed' 
                    : 'bg-amber-500 hover:bg-amber-600'
                } text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg mt-6`}
                aria-disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register Now'}
              </button>
            </form>
          </div>

          {/* Right Side Banner */}
          <div className="relative h-80 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={HeroImg}
              alt="Food background"
              className="object-cover"
              quality={100}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
                Tamang Foodservice
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;