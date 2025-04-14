const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/signup', authController.Signup);
router.post('/login', authController.login);
router.put('/update-password', authController.updatePassword);

module.exports = router;
