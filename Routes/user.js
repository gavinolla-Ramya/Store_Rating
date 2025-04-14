const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store'); // Ensure you import the correct controller
const ratingController = require('../controllers/rating'); // Assuming you have a rating controller

// Store browsing (for users to see all stores or search)
router.get('/stores', storeController.getAllStores);  // Get all stores with optional search
router.get('/store/:id', storeController.getStoreDetails);  // Get store details by ID

// Ratings (for submitting or updating ratings for a store)
router.post('/rate', ratingController.createRating);  // Submit rating
// router.put('/rate', ratingController.updateRating);  // Update rating

module.exports = router;
