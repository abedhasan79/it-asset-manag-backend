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

exports.updateCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const { name, password, currentPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ error: 'Current password is required' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    if (name) user.name = name;
    if (password) user.password = password;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

exports.updateUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (req.body.name) user.name = req.body.name;
    await user.save();

    // Update clinic (if allowed)
    if (req.body.clinicName || req.body.clinicAddress) {
      const clinic = await Clinic.findById(req.user.clinicId);
      if (req.body.clinicName) clinic.name = req.body.clinicName;
      if (req.body.clinicAddress) clinic.address = req.body.clinicAddress;
      await clinic.save();
    }

    res.json({ message: 'User and clinic updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update info' });
  }
};

// Change password securely
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to change password' });
  }
};