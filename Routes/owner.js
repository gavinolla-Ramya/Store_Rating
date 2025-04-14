// routes/owner.js
const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/store');
const { verifyToken, isStoreOwner } = require('../middleware/authMiddleware');

// Protected route: Store Owners only
router.get('/ratings', verifyToken, isStoreOwner, ownerController.getStoreRatings);

module.exports = router;
