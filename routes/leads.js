const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const auth = require('../middleware/auth');

// @route   POST api/leads/verify
// @desc    Verify a lead and get score
// @access  Public/Private
router.post('/verify', leadController.verifyLead);

// @route   GET api/leads
// @desc    Get all leads for current user
// @access  Private
router.get('/', auth, leadController.getLeads);

module.exports = router; 