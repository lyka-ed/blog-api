import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectMongoDb } from "./src/config/database.js";
import router from "./src/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

connectMongoDb();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Blog-API at http://localhost:${PORT}`);
});
