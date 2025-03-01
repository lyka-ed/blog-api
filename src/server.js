const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3030;

app.get("/", (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
