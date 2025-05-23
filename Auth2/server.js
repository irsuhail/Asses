require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/content', contentRoutes);
app.use('/subscription', subscriptionRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  }).catch(err => console.log(err));
