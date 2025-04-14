const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const storeController = require('../controllers/store')

// Admin dashboard
router.get('/dashboard', adminController.getDashboard);

// Manage Users
router.get('/users', adminController.getUsers);
router.post('/add-user', adminController.addUser);
router.get('/user/:id', adminController.getUserById);

// Manage Stores
router.get('/stores', adminController.getStores);
router.post('/stores', storeController.createStore);

router.get('/store/:id', adminController.getStoreById);

module.exports = router;
