require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

connectDB(process.env.MONGO_URI).catch(err => {
  console.error('DB connect error', err);
  process.exit(1);
});

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});
