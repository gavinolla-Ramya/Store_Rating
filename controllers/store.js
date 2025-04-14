const db = require('../models');
const Store = db.store;
const Rating = db.rating;
const User = db.user;
const { Op } = db.Sequelize;

// ✅ Store Owner - Get ratings of their stores
exports.getStoreRatings = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const stores = await Store.findAll({
      where: { ownerId },
      include: [
        {
          model: Rating,
          as: 'ratings',
        }
      ]
    });

    if (!stores || stores.length === 0) {
      return res.status(404).json({ message: 'No stores found for this owner' });
    }

    res.json(stores);
  } catch (err) {
    console.error("Error fetching store ratings:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin - Create a store
exports.createStore = async (req, res) => {
  const { name, address, ownerId } = req.body;

  if (!name || !address || !ownerId) {
    return res.status(400).json({ message: 'Name, address, and ownerId are required' });
  }

  try {
    const newStore = await Store.create({ name, address, ownerId });
    res.status(201).json(newStore);
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Get all stores (with optional search by name/address)
exports.getAllStores = async (req, res) => {
  const { search } = req.query;

  const where = search
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
        ],
      }
    : {};

  try {
    const stores = await Store.findAll({ where });

    return res.status(200).json(stores); // always returns 200 with the result (empty or not)
  } catch (err) {
    console.error('Error fetching stores:', err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get store details by ID
exports.getStoreDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Store.findByPk(id, {
      include: [
        {
          model: Rating,
          as: 'ratings',
        }
      ]
    });

    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json(store);
  } catch (err) {
    console.error('Error fetching store details:', err);
    res.status(500).json({ error: err.message });
  }
};
