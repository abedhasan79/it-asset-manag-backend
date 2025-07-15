const User = require('../models/User');
const Clinic = require('../models/Clinic');

// Get logged-in user profile
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get user' });
  }
};

// Get clinic info (for header/settings)
exports.getClinicInfo = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.user.clinicId);
    res.json(clinic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get clinic info' });
  }
};