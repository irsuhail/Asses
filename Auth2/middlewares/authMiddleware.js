const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklistModel');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  // Check if token is blacklisted
  const blacklisted = await Blacklist.findOne({ token });
  if (blacklisted) return res.status(401).json({ message: 'Token has been revoked' });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
