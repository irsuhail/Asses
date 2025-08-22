const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { SECRET_QUESTIONS } = require('../utils/constants');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Basic rate limiting for auth-sensitive routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false
});

const signToken = (user) => {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '1h' }
  );
};

/**
 * @route POST /api/auth/signup
 * body: { name, email, password, secretQuestion, secretAnswer }
 */
router.post('/signup', authLimiter, async (req, res) => {
  try {
    const { name, email, password, secretQuestion, secretAnswer } = req.body || {};

    if (!name || !email || !password || !secretQuestion || !secretAnswer) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!SECRET_QUESTIONS.includes(secretQuestion)) {
      return res.status(400).json({ message: 'Invalid secret question' });
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(409).json({ message: 'Account already exists' });

    const passwordHash = await User.hash(password);
    const secretAnswerHash = await User.hash(secretAnswer);

    const user = await User.create({
      name,
      email,
      passwordHash,
      secretQuestion,
      secretAnswerHash
    });

    // Optionally auto-login after signup
    const token = signToken(user);
    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route POST /api/auth/login
 * body: { email, password }
 */
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    return res.json({ user, token });
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route GET /api/auth/me  (protected)
 */
router.get('/me', protect, async (req, res) => {
  res.json({ user: req.user });
});

/**
 * @route PATCH /api/auth/profile  (protected)
 * body can include: { name, secretQuestion, secretAnswer }
 * NOTE: Email cannot be updated here (blocked).
 */
router.patch('/profile', protect, async (req, res) => {
  try {
    const { email, name, secretQuestion, secretAnswer } = req.body || {};

    if (email && email !== req.user.email) {
      return res.status(400).json({ message: 'Email cannot be changed' });
    }

    if (name) req.user.name = String(name).trim();

    if (secretQuestion || secretAnswer) {
      if (!secretQuestion || !secretAnswer) {
        return res.status(400).json({ message: 'Provide both secretQuestion and secretAnswer' });
      }
      if (!SECRET_QUESTIONS.includes(secretQuestion)) {
        return res.status(400).json({ message: 'Invalid secret question' });
      }
      req.user.secretQuestion = secretQuestion;
      req.user.secretAnswerHash = await User.hash(secretAnswer);
    }

    await req.user.save();
    res.json({ user: req.user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route POST /api/auth/reset-password
 * body: { email, secretQuestion, secretAnswer, newPassword }
 * No login required. Strict verification of secret Q&A.
 */
router.post('/reset-password', authLimiter, async (req, res) => {
  try {
    const { email, secretQuestion, secretAnswer, newPassword } = req.body || {};

    if (!email || !secretQuestion || !secretAnswer || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    // Use generic message to avoid leaking if user exists or which answer is wrong
    if (!user) return res.status(400).json({ message: 'Cannot reset password' });

    if (user.secretQuestion !== secretQuestion) {
      return res.status(400).json({ message: 'Cannot reset password' });
    }

    const ok = await user.compareSecretAnswer(secretAnswer);
    if (!ok) return res.status(400).json({ message: 'Cannot reset password' });

    user.passwordHash = await User.hash(newPassword);
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
