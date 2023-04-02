const express = require("express");
const cors = require("cors");

const multer = require("multer");
const pdf = require("pdf-parse");
const path = require("path");
const sdk = require("api")("@writesonic/v2.2#4enbxztlcbti48j");

const apiKey = "ecb4490a-cd1e-475e-b53b-e23db844690c";
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// deployment
__dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);
//

sdk.auth(apiKey);

app.post("/generate-content", async (req, res) => {
  const { question } = req.body;
  try {
    const response = await sdk.chatsonic_V2BusinessContentChatsonic_post(
      {
        enable_google_results: true,
        enable_memory: false,
        input_text: question,
      },
      { engine: "premium" }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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
      // Parse the PDF file and send the parsed text as a response
      const pdfData = req.file.buffer;
      pdf(pdfData)
        .then((data) => {
          const parsedText = data.text;
          console.log(parsedText);
          res.send(parsedText);
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
