const User = require('../models/User');
const Clinic = require('../models/Clinic');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      clinicId: user.clinicId
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, clinicName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // Create new clinic
    const clinic = new Clinic({ name: clinicName });
    await clinic.save();

    const user = new User({
      name,
      email,
      password,
      clinicId: clinic._id
    });

    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};