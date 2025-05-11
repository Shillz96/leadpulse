'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import GlowingButton from "@/components/GlowingButton";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-warm-ivory">
      <div className="z-10 max-w-5xl w-full items-center justify-between flex-col lg:flex-row gap-8 text-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center space-y-6 px-4">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800">
            <span className="text-marigold">LeadPulse</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A cutting-edge platform for real estate wholesalers to verify and generate high-quality leads
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <GlowingButton onClick={() => router.push('/leads/verify')}>
              Verify Lead
            </GlowingButton>
            {!isAuthenticated && (
              <GlowingButton color="muted-sky-blue" onClick={() => router.push('/auth')}>
                Sign Up Free
              </GlowingButton>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Feature 1 */}
        <div className="bg-bright-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-marigold rounded-full flex items-center justify-center mb-4 text-bright-white font-bold">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2">Lead Verification</h3>
          <p className="text-gray-600">
            Automatically verify lead information with our AI-driven tools.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-bright-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-soft-fern rounded-full flex items-center justify-center mb-4 text-bright-white font-bold">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2">Multi-Channel Integration</h3>
          <p className="text-gray-600">
            Collect leads from various sources and centralize them in one dashboard.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-bright-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-peony-pink rounded-full flex items-center justify-center mb-4 text-bright-white font-bold">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2">Automated Drip Campaigns</h3>
          <p className="text-gray-600">
            Set up automated follow-ups to nurture leads and increase conversions.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20 w-full max-w-5xl bg-muted-sky-blue bg-opacity-10 p-10 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Start Verifying Leads Today</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join thousands of real estate professionals who use LeadPulse to streamline their lead verification process.
        </p>
        <GlowingButton onClick={() => router.push('/leads/verify')} className="px-8 py-3 text-lg">
          Try It Free
        </GlowingButton>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl mt-20 border-t pt-8 flex justify-center items-center">
        <p className="text-gray-500">© 2023 LeadPulse. All rights reserved.</p>
      </footer>
    </main>
  );
} 