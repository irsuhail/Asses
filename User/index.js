const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const readUsers = () => {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
};

const writeUsers = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2), "utf-8");
};


app.post("/users", (req, res) => {
  const users = readUsers();
  const newUser = req.body;
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ message: "User added successfully" });
});


app.get("/users", (req, res) => {
  const users = readUsers().map(({ password, ...rest }) => rest);
  res.json(users);
});


app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = readUsers().find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { password, ...safeUser } = user;
  res.json(safeUser);
});


app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { username, password, email } = req.body;

  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  if (email && email !== users[index].email) {
    return res.status(400).json({ message: "Email cannot be updated" });
  }

  if (username) users[index].username = username;
  if (password) users[index].password = password;

  writeUsers(users);
  res.json({ message: "User updated successfully" });
});


app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();
  const filteredUsers = users.filter((u) => u.id !== id);

  if (filteredUsers.length === users.length) {
    return res.status(404).json({ message: "User not found" });
  }

  writeUsers(filteredUsers);
  res.json({ message: "User deleted successfully" });
});


app.get("/users/search", (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ message: "Query is required" });

  const users = readUsers();
  const result = users
    .filter((u) => u.username.toLowerCase().includes(username.toLowerCase()))
    .map(({ password, ...rest }) => rest);

  if (result.length === 0) return res.json({ message: "No users found" });
  res.json(result);
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
