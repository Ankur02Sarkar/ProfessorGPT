import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText) return; // add this line to prevent empty input

    try {
      const response = await fetch("/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText }),
      });
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  const [pdfFile, setPdfFile] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("pdfFile", pdfFile);

    axios
      .post("/upload", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <div>
        <h1>PDF File Uploader</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>

      <h1>Generate Content</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Input Text:
          <input type="text" value={inputText} onChange={handleInputChange} />
        </label>
        <button type="submit">Generate</button>
      </form>
      {result && (
        <div>
          <h2>Result:</h2>
          <p dangerouslySetInnerHTML={{ __html: result }}></p>
        </div>
      )}
    </div>
  );
}

export default App;
