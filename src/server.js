import express from "express";
import dotenv from "dotenv";
import { connectMongoDb } from "./config/database.js"; // Ensure this file exists!

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;

connectMongoDb();

app.get("/", (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Blog-API at http://localhost:${PORT}`);
});
