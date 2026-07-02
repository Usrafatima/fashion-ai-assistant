// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", module: "AI Core Developer" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`AI Core service running on http://localhost:${PORT}`);
});
