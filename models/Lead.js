const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  propertyDetails: {
    type: {
      type: String,
      enum: ['Single Family', 'Multi Family', 'Condo', 'Land', 'Commercial', 'Other'],
      default: 'Single Family'
    },
    bedrooms: Number,
    bathrooms: Number,
    squareFeet: Number,
    yearBuilt: Number
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Negotiating', 'Closed', 'Lost'],
    default: 'New'
  },
  source: {
    type: String,
    required: false
  },
  score: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lead', LeadSchema); 