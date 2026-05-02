const fs = require("fs");

app.post("/upload", upload.single("file"), (req, res) => {
  const data = {
    nama: req.body.nama,
    nim: req.body.nim,
    kelas: req.body.kelas,
    file: req.file.filename,
  };

  let lama = [];

  if (fs.existsSync("data.json")) {
    lama = JSON.parse(fs.readFileSync("data.json"));
  }

  lama.push(data);

  fs.writeFileSync("data.json", JSON.stringify(lama, null, 2));

  res.json({ message: "Upload berhasil!" });
});
