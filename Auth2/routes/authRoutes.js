const express = require('express');
const router = express.Router();
const { signup, login, logout, refresh } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/refresh', refresh);

module.exports = router;
