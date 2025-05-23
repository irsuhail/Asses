const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateTokens } = require('../utils/generateTokens');
const jwt = require('jsonwebtoken');

async function signup(req, res) {
  const { username, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
}

function refresh(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Missing refresh token' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });
    const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
}

module.exports = { signup, login, refresh };
