const Lead = require('../models/Lead');

// Verify a lead and return score
exports.verifyLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      propertyDetails
    } = req.body;

    // Create a new lead object
    const lead = new Lead({
      firstName,
      lastName,
      email,
      phone,
      address,
      propertyDetails,
      owner: req.user ? req.user.id : null
    });

    // Perform verification logic
    // This would typically involve API calls to external services
    // For demo purposes, we'll simulate with a simple algorithm
    
    let score = 0;
    let verified = false;
    
    // Basic scoring algorithm (just for demonstration)
    if (email) score += 20; // Email presence
    if (phone) score += 20; // Phone presence
    if (address && address.street) score += 15; // Address presence
    if (address && address.zipCode) score += 15; // ZIP code presence
    if (propertyDetails && propertyDetails.squareFeet) score += 15; // Property details presence
    if (propertyDetails && propertyDetails.yearBuilt) score += 15; // Year built presence
    
    // Threshold for verification (70 out of 100)
    if (score >= 70) {
      verified = true;
    }
    
    // Update lead with score and verification status
    lead.score = score;
    lead.verified = verified;
    
    // Save lead to database if authenticated
    if (req.user) {
      await lead.save();
    }
    
    // Return results
    res.json({
      verified,
      score,
      lead: req.user ? lead : null, // Only return full lead object if authenticated
      message: verified 
        ? 'Lead verified successfully' 
        : 'Lead needs more information for verification'
    });
    
  } catch (err) {
    console.error('Error in verifyLead:', err.message);
    res.status(500).send('Server error');
  }
};

// Get all leads for current user
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error('Error in getLeads:', err.message);
    res.status(500).send('Server error');
  }
}; 