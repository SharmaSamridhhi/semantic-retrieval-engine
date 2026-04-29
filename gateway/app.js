const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const form = new FormData();
    form.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    const response = await axios.post("http://localhost:8000/upload", form, {
      headers: form.getHeaders(),
    });
    res.json(response.data);
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.post("/search", async (req, res) => {
  try {
    const { query, document_id } = req.body;
    const response = await axios.post("http://localhost:8000/search", {
      query,
      document_id,
    });
    res.json(response.data);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Gateway running on PORT : ${PORT}`);
});
