'use client';

import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const LeadContext = createContext();

export const useLeads = () => useContext(LeadContext);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function LeadProvider({ children }) {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  // Verify a lead
  const verifyLead = async (leadData) => {
    setLoading(true);
    setError(null);
    setVerificationResult(null);
    
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      
      // Add auth token if available
      if (token) {
        headers['x-auth-token'] = token;
      }
      
      const response = await fetch(`${API_URL}/api/leads/verify`, {
        method: 'POST',
        headers,
        body: JSON.stringify(leadData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.msg || 'Lead verification failed');
      }
      
      setVerificationResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Get all leads
  const getLeads = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        headers: {
          'x-auth-token': token
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to fetch leads');
      }
      
      setLeads(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        loading,
        error,
        verificationResult,
        verifyLead,
        getLeads,
        clearVerificationResult: () => setVerificationResult(null)
      }}
    >
      {children}
    </LeadContext.Provider>
  );
} 