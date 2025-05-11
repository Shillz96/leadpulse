'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/leads/verify');
    }
  }, [isAuthenticated, router]);
  
  const handleSuccess = () => {
    router.push('/leads/verify');
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-warm-ivory">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-marigold mb-2">LeadPulse</h1>
          <p className="text-gray-600">
            {activeTab === 'login' 
              ? 'Log in to access your account' 
              : 'Create an account to get started'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'login'
                  ? 'bg-marigold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'register'
                  ? 'bg-marigold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'login' ? (
              <LoginForm onSuccess={handleSuccess} />
            ) : (
              <RegisterForm onSuccess={handleSuccess} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 