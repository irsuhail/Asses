const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const todoRoutes = require('./routes/todos');

app.use(express.json()); // Middleware for JSON parsing

// Route segregation
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
