'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 Mock user data based on credentials
    let mockUser = null;

    if (email === 'admin@example.com' && password === 'adminpass') {
      mockUser = {
        user_id: 'admin123',
        role_type: 'admin',
      };
    } else if (email === 'user@example.com' && password === 'password') {
      mockUser = {
        user_id: 'user456',
        role_type: 'user',
      };
    }

    // ✅ Set localStorage and redirect if valid
    if (mockUser) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('user_id', mockUser.user_id);
      localStorage.setItem('role_type', mockUser.role_type);
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Main content container */}
      <div className="relative z-10 w-full sm:w-96 p-12 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-xl">
        {/* Logo and Tagline */}
        <div className="text-center mb-12">
          <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
            SkillSync
          </div>
          <p className="text-2xl font-bold text-black text-shadow-lg">
            Syncing developers with their dream projects, seamlessly.
          </p>
        </div>

        {/* Sign-In Form */}
        <form onSubmit={handleSignIn} className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black-200">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-4 w-full rounded-lg border border-gray-300 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-70 placeholder:text-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black-200">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-4 w-full rounded-lg border border-gray-300 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-70 placeholder:text-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>

        {/* Footer Text */}
        <p className="mt-6 text-center text-sm text-black-300">
          Don't have an account?{' '}
          <a href="/registration/signup" className="text-indigo-500 font-semibold hover:text-indigo-600">Sign Up</a>
        </p>
      </div>

      {/* Optional Floating Icon */}
      <div className="absolute bottom-5 right-5 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 cursor-pointer">
        <span className="text-xl">💡</span>
      </div>
    </div>
  );
}
