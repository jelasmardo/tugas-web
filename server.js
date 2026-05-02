const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// buat folder uploads kalau belum ada
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// static file
app.use(express.static(__dirname));
app.use("/uploads", express.static("uploads"));

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

// upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "Upload berhasil!" });
});

// lihat file
app.get("/files", (req, res) => {
  const files = fs.readdirSync("./uploads");
  res.json(files);
});

// port Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
