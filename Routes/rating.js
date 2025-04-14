const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.js');

router.post('/', ratingController.createRating);
router.get('/store/:storeId', ratingController.getRatingsForStore);

module.exports = router;
