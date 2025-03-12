import express from "express";
import dotenv from "dotenv";
import { connectMongoDb } from "./src/config/database.js"; // Ensure this file exists!
import router from "./src/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;

connectMongoDb();

// Load routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Blog-API at http://localhost:${PORT}`);
});
