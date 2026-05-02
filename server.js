const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// biar bisa akses index.html
app.use(express.static(__dirname));

// setup upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// route upload
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("Upload berhasil!");
});

// WAJIB untuk Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
