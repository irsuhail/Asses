// server.js
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());


const readData = () => {
  try {
    return JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
};


app.post("/dishes", (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const dishes = readData();
  const newDish = {
    id: Date.now(),
    name,
    price,
    category,
  };

  dishes.push(newDish);
  writeData(dishes);

  res.status(201).json(newDish);
});


app.get("/dishes", (req, res) => {
  const dishes = readData();
  res.status(200).json(dishes);
});


app.get("/dishes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dishes = readData();
  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    return res.status(404).json({ error: "Dish not found" });
  }

  res.status(200).json(dish);
});


app.put("/dishes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dishes = readData();
  const index = dishes.findIndex((d) => d.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Dish not found" });
  }

  const updatedDish = { ...dishes[index], ...req.body, id };
  dishes[index] = updatedDish;
  writeData(dishes);

  res.status(200).json(updatedDish);
});


app.delete("/dishes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let dishes = readData();
  const index = dishes.findIndex((d) => d.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Dish not found" });
  }

  const deleted = dishes.splice(index, 1);
  writeData(dishes);

  res.status(200).json({ message: "Dish deleted", deleted: deleted[0] });
});


app.get("/dishes/get", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Query parameter 'name' is required" });
  }

  const dishes = readData();
  const matches = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(name.toLowerCase())
  );

  if (matches.length === 0) {
    return res.status(404).json({ message: "No dishes found" });
  }

  res.status(200).json(matches);
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
