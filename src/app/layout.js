'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LeadProvider } from "@/context/LeadContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LeadPulse - AI-driven Lead Verification for Real Estate Wholesalers",
  description: "A cutting-edge platform for real estate wholesalers to efficiently verify and generate high-quality leads using AI-driven tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LeadProvider>
            <Navbar />
            {children}
          </LeadProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 