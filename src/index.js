const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/leadpulse_dev';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Routes
app.use('/api/auth', require('../routes/auth'));
app.use('/api/leads', require('../routes/leads'));

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LeadPulse API is running' });
});

// Sample lead verification endpoint
app.post('/api/verify-lead', (req, res) => {
  const { leadData } = req.body;
  // Implement verification logic here
  // This is a placeholder response
  res.json({ verified: true, score: 85 });
});

// Sample lead integration endpoint (webhook)
app.post('/api/integrate-lead', (req, res) => {
  const lead = req.body;
  // Save lead to database logic here
  res.status(200).json({ success: true, message: 'Lead received' });
});

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 