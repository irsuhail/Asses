const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOTPEmail } = require('../utils/mailer');
const { setOTP, getOTP, deleteOTP } = require('../otpStore');

const router = express.Router();

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });
    return res.json({ message: 'User created', userId: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Login -> generate OTP and send
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    // generate OTP, store with key, send email
    const otp = generateOTP();
    const key = `otp:${user._id}`; // you can use email as well
    await setOTP(key, otp, 60 * 5); // 5 minutes

    // send mail (fire and forget - handle errors)
    try { await sendOTPEmail(user.email, otp); } catch (mailErr) { console.error('Mail error', mailErr); }

    // Return something to client so it knows which user to verify OTP for:
    return res.json({ message: 'OTP sent', loginId: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { loginId, otp } = req.body;
    if (!loginId || !otp) return res.status(400).json({ message: 'Missing fields' });

    const key = `otp:${loginId}`;
    const stored = await getOTP(key);

    if (!stored) return res.status(400).json({ message: 'OTP expired or not found' });
    if (stored !== otp) return res.status(400).json({ message: 'Invalid OTP' });

   
    await deleteOTP(key);

    const token = jwt.sign({ userId: loginId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

    return res.json({ message: 'Authenticated', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
