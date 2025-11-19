import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

// Read data
async function readData() {
  try {
    const data = await readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Write data
async function writeData(data) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// CREATE
app.post("/items", async (req, res) => {
  const items = await readData();
  const item = { id: Date.now(), name: req.body.name };

  items.push(item);
  await writeData(items);

  res.json({ message: "Item added", item });
});

// READ ALL
app.get("/items", async (req, res) => {
  const items = await readData();
  res.json(items);
});

// READ ONE
app.get("/items/:id", async (req, res) => {
  const items = await readData();
  const item = items.find(i => i.id == req.params.id);

  item
    ? res.json(item)
    : res.status(404).json({ message: "Not found" });
});

// UPDATE
app.put("/items/:id", async (req, res) => {
  let items = await readData();
  const index = items.findIndex(i => i.id == req.params.id);

  if (index === -1)
    return res.status(404).json({ message: "Not found" });

  items[index].name = req.body.name;
  await writeData(items);

  res.json({ message: "Item updated", item: items[index] });
});

// DELETE
app.delete("/items/:id", async (req, res) => {
  const items = await readData();
  const filtered = items.filter(i => i.id != req.params.id);

  await writeData(filtered);
  res.json({ message: "Item deleted" });
});

// HOME
app.get("/", (req, res) => {
  res.send("CRUD API (Node 22 Express 5) is running.");
});

// START
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
