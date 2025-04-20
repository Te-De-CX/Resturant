// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRegister } from '@/lib/api/auth';
import Image from 'next/image';
import HeroImg from '../../../../../public/images/auth/register/bg.jpg';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { mutate: register, isPending } = useRegister();
  // const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImg}
          alt="Food background"
          className="object-cover w-full h-full"
          quality={100}
          priority
          fill
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Registration Form */}
          <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl border border-white/20 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full px-5 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/70"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/70"
                />
              </div>
              
              <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={formData.password}
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/70"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/70"
                  />
                </div>
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/70"
                />
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <p className="text-white/80 text-sm">Already have an account?</p>
                <Link href="/login" className="text-amber-300 hover:text-amber-200 text-sm font-medium">
                  Sign In
                </Link>
              </div>
              
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-3 px-4 ${
                  isPending ? 'bg-amber-600 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'
                } text-white font-semibold rounded-lg transition-colors duration-300 shadow-md`}
              >
                {isPending ? 'Creating account...' : 'Register'}
              </button>
            </form>
          </div>
          
          {/* Right Side Banner */}
          <div className="relative md:block h-80 lg:h-[500px] rounded-xl overflow-hidden hidden shadow-2xl">
            <Image
              src={HeroImg}
              alt="Food background"
              className="object-cover"
              quality={100}
              priority
              fill
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