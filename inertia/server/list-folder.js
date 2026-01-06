const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 4000;
// const BASE_DIR = "E:/Hicas/jasminetest/acd-reports";
const BASE_DIR = "E:/Hicas/inertia/reports";

app.use(cors());

// API to get list of folders and files in a directory
app.get("/api/list", (req, res) => {
  const relPath = req.query.path || "";
  const absPath = path.join(BASE_DIR, relPath);

  fs.readdir(absPath, { withFileTypes: true }, (err, entries) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(
      entries.map((entry) => ({
        name: entry.name,
        isDirectory: entry.isDirectory(),
      }))
    );
  });
});

// API to serve static files (index.html or other files)
app.use("/files", express.static(BASE_DIR));

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
