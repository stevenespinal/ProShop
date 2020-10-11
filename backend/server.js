import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import colors from "colors";
const port = process.env.PORT || 5000;
import connectDb from "./config/db.js";

dotenv.config();

connectDb();
const app = express();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold));