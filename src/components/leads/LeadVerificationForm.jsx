'use client';

import { useState } from 'react';
import { useLeads } from '@/context/LeadContext';
import GlowingButton from '@/components/GlowingButton';

export default function LeadVerificationForm() {
  const { verifyLead, loading, error, verificationResult } = useLeads();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    propertyDetails: {
      type: 'Single Family',
      bedrooms: '',
      bathrooms: '',
      squareFeet: '',
      yearBuilt: ''
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyLead(formData);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-bright-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Lead Verification</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-marigold">Personal Information</h3>
              
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                />
              </div>
            </div>
            
            {/* Address */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-muted-sky-blue">Property Address</h3>
              
              <div className="mb-4">
                <label htmlFor="address.street" className="block text-gray-700 text-sm font-medium mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="address.city" className="block text-gray-700 text-sm font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="address.city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address.state" className="block text-gray-700 text-sm font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    id="address.state"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="address.zipCode" className="block text-gray-700 text-sm font-medium mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="address.zipCode"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address.country" className="block text-gray-700 text-sm font-medium mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="address.country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Details */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4 text-soft-fern">Property Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mb-4">
                <label htmlFor="propertyDetails.type" className="block text-gray-700 text-sm font-medium mb-2">
                  Property Type
                </label>
                <select
                  id="propertyDetails.type"
                  name="propertyDetails.type"
                  value={formData.propertyDetails.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                >
                  <option value="Single Family">Single Family</option>
                  <option value="Multi Family">Multi Family</option>
                  <option value="Condo">Condo</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="propertyDetails.bedrooms" className="block text-gray-700 text-sm font-medium mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="propertyDetails.bedrooms"
                  name="propertyDetails.bedrooms"
                  value={formData.propertyDetails.bedrooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="propertyDetails.bathrooms" className="block text-gray-700 text-sm font-medium mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="propertyDetails.bathrooms"
                  name="propertyDetails.bathrooms"
                  value={formData.propertyDetails.bathrooms}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="propertyDetails.squareFeet" className="block text-gray-700 text-sm font-medium mb-2">
                  Square Feet
                </label>
                <input
                  type="number"
                  id="propertyDetails.squareFeet"
                  name="propertyDetails.squareFeet"
                  value={formData.propertyDetails.squareFeet}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="propertyDetails.yearBuilt" className="block text-gray-700 text-sm font-medium mb-2">
                  Year Built
                </label>
                <input
                  type="number"
                  id="propertyDetails.yearBuilt"
                  name="propertyDetails.yearBuilt"
                  value={formData.propertyDetails.yearBuilt}
                  onChange={handleChange}
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marigold"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <GlowingButton type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Lead'}
            </GlowingButton>
          </div>
        </form>
        
        {/* Verification Result */}
        {verificationResult && (
          <div className="mt-8 p-6 border rounded-lg bg-warm-ivory">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Verification Results
            </h3>
            
            <div className="flex justify-center mb-6">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                verificationResult.verified ? 'bg-soft-fern' : 'bg-peony-pink'
              }`}>
                <span className="text-4xl font-bold text-bright-white">
                  {verificationResult.score}%
                </span>
              </div>
            </div>
            
            <p className="text-center text-lg mb-4">
              {verificationResult.verified
                ? 'Lead verified successfully!'
                : 'Lead needs more information for verification.'}
            </p>
            
            <div className="flex justify-center mt-6">
              <GlowingButton 
                color={verificationResult.verified ? 'soft-fern' : 'peony-pink'}
                onClick={() => window.location.reload()}
              >
                Verify Another Lead
              </GlowingButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 