const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.user;

// Unified signup or register
exports.Signup = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body; // Default to 'user' if no role
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error("Signup Error:", error); // Very important for debugging
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ error: error.message });
  }
  
};

// Unified login method
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    // Log to ensure the user data is correct
    console.log('Sending user data:', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    // Don't send password back in response
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.json({ message: 'Login successful', token, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update password method
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; // This assumes you use authentication middleware to set req.user

  try {
    const user = await User.findByPk(userId);
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(401).json({ message: 'Wrong current password' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
