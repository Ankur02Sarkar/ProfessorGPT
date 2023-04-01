const express = require("express");
const cors = require("cors");
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
    const response = await sdk.chatsonic_V2BusinessContentChatsonic_post({
      enable_google_results: true,
      enable_memory: false,
      input_text: inputText,
    }, {engine: 'premium'});
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
