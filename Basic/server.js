// server.js
const express = require("express");
const app = express();

// Route: GET /home
app.get("/home", (req, res) => {
  res.status(200).send("<h1>Welcome to Home Page</h1>");
});

// Route: GET /aboutus
app.get("/aboutus", (req, res) => {
  res.status(200).json({ message: "Welcome to About Us" });
});

// Route: GET /contactus
app.get("/contactus", (req, res) => {
  res.status(200).json({
    email: "contact@example.com",
    phone: "+91-1234567890",
    address: "123 Main Street, City, India"
  });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start server
const PORT = 3000;
app.listen(3000,()=>{
    console.log("server started on http://localhost:3000");
});

