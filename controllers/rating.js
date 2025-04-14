const db = require('../models');
const Rating = db.rating;

// POST /api/rating
exports.createRating = async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id; // This assumes you're using authentication middleware

  try {
    let existing = await Rating.findOne({ where: { userId, storeId } });

    if (existing) {
      existing.rating = rating;
      await existing.save();
    } else {
      await Rating.create({ userId, storeId, rating });
    }

    res.json({ message: 'Rating submitted/updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/rating/store/:storeId
exports.getRatingsForStore = async (req, res) => {
  const storeId = req.params.storeId;

  try {
    const ratings = await Rating.findAll({ where: { storeId } });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
