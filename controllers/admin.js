const db = require('../models');
const User = db.user;
const Store = db.store;

// Admin Dashboard
exports.getDashboard = (req, res) => {
  try {
    // You can fetch statistics or data for the dashboard here
    res.status(200).json({ message: 'Admin dashboard data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manage Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manage Stores
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json({ stores });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addStore = async (req, res) => {
  const { name, address, ownerId } = req.body;
  try {
    const newStore = await Store.create({ name, address, ownerId });

    res.status(201).json({ message: 'Store created successfully', store: newStore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStoreById = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    res.status(200).json({ store });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
