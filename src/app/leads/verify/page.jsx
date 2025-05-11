'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LeadVerificationForm from '@/components/leads/LeadVerificationForm';
import GlowingButton from '@/components/GlowingButton';

export default function VerifyLeadPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  
  // Optional: Redirect to auth page if not authenticated
  // Uncomment if you want to make this page private
  /*
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  */
  
  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  return (
    <main className="min-h-screen bg-warm-ivory py-10 px-4">
      {/* Header with auth status */}
      <div className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-marigold">Lead Verification</h1>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700">
                Welcome, <span className="font-medium">{user?.name || user?.email}</span>
              </span>
              <GlowingButton 
                color="peony-pink" 
                onClick={handleLogout}
              >
                Logout
              </GlowingButton>
            </>
          ) : (
            <GlowingButton onClick={() => router.push('/auth')}>
              Login / Register
            </GlowingButton>
          )}
        </div>
      </div>
      
      {/* Lead verification form */}
      <LeadVerificationForm />
      
      {/* Information about authentication benefits */}
      {!isAuthenticated && (
        <div className="max-w-2xl mx-auto mt-16 p-6 bg-muted-sky-blue bg-opacity-10 rounded-lg border border-muted-sky-blue">
          <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">
            Create an Account for More Features
          </h3>
          <p className="text-gray-600 mb-4">
            When you create a free account, you can:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
            <li>Save verified leads to your dashboard</li>
            <li>Export lead data to CSV or Excel</li>
            <li>Access advanced verification tools</li>
            <li>Set up automated drip campaigns</li>
          </ul>
          <div className="text-center">
            <GlowingButton onClick={() => router.push('/auth')}>
              Sign Up Now
            </GlowingButton>
          </div>
        </div>
      )}
    </main>
  );
} 