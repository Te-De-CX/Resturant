'use client';

import Image from 'next/image';
import HeroImg from '../../../../../public/images/auth/login/bg.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLogin } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

type LoginCredentials = {
  username: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    toast.promise(
      new Promise<void>((resolve, reject) => {
        login(credentials, {
          onSuccess: () => {
            resolve();
            router.push('/dashboard');
          },
          onError: (error: Error) => {
            reject(error);
          },
        });
      }),
      {
        loading: 'Signing in...',
        success: 'Login successful! Redirecting...',
        error: (err: Error) => {
          return err.message || 'Invalid username or password';
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImg}
          alt="Noodles background"
          className="object-cover w-full h-full"
          quality={100}
          priority
          fill
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Login Form */}
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Login</h3>
            
            <form 
              className="space-y-6" 
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <input 
                  type="text" 
                  name="username"
                  placeholder="Username or Email"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
        minLength={8}
        className="w-full px-5 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/70"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
              
              <div className="flex justify-between items-center">
                <p className="text-white/80 text-sm">Don&apos;t have an account?</p>
                <Link 
                  href="/Register" 
                  className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors"
                  passHref
                >
                  Register
                </Link>
              </div>
              
              <button 
                type="submit" 
                disabled={isPending}
                className={`w-full py-3 px-4 ${
                  isPending 
                    ? 'bg-amber-600 cursor-not-allowed' 
                    : 'bg-amber-500 hover:bg-amber-600'
                } text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg`}
                aria-disabled={isPending}
              >
                {isPending ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Right Side Image */}
          <div className="relative md:block h-96 lg:h-full rounded-2xl overflow-hidden hidden shadow-xl">
            <Image
              src={HeroImg}
              alt="Noodles background"
              className="object-cover"
              quality={100}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-white text-center">
                Tamang Foodservice
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
    </section>
  );
};

export default Login;