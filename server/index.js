const express = require("express");
const cors = require("cors");

const multer = require("multer");
const pdf = require("pdf-parse");

const sdk = require("api")("@writesonic/v2.2#4enbxztlcbti48j");

const apiKey = "ecb4490a-cd1e-475e-b53b-e23db844690c";
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sdk.auth(apiKey);

app.post("/generate-content", async (req, res) => {
  const { inputText } = req.body;
  try {
    const response = await sdk.chatsonic_V2BusinessContentChatsonic_post(
      {
        enable_google_results: true,
        enable_memory: false,
        input_text: inputText,
      },
      { engine: "premium" }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Set storage engine for multer
const storage = multer.memoryStorage();

// Init upload
const upload = multer({
  storage: storage,
}).single("pdfFile");

// Route for uploading PDF file
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // Parse the PDF file and console log the contents
      const pdfData = req.file.buffer;
      pdf(pdfData)
        .then((data) => {
          console.log("HELLO ......     ",data.text);
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
