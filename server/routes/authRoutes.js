const express = require('express');
const router = express.Router();
const { signup, login, getProfile, updateProfile,getAllUsers } = require('../controllers/authController');
const { authMiddleware ,adminMiddleware} = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;
