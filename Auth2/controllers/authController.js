const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Blacklist = require('../models/blacklistModel');
const { createTokens } = require('../utils/tokenUtils');

const signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error registering user', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const tokens = createTokens(user);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(400).json({ message: 'Token required' });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const expiration = decoded.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const ttl = Math.floor((expiration - now) / 1000); // Time to live in seconds

    const blacklistedToken = new Blacklist({ token });
    await blacklistedToken.save();

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid token', error: err.message });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const tokens = createTokens(user);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired refresh token', error: err.message });
  }
};

module.exports = { signup, login, logout, refresh };
