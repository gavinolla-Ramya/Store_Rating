const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.js');

router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreDetails);
router.post('/', storeController.createStore);
// router.put('/:id', storeController.updateStore);

module.exports = router;
