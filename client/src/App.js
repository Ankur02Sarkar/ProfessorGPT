import React, { useState } from "react";
// import axios from "axios";
import Loading from "./Loading";
function App() {
  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setInputText(e.target.value);
  const consoleLog = (e) => {
    setQuery(
      inputText +
        "\n\nAnswer the above question with respect to the context below. The response should not exceed 300 characters:-\n" +
        parsedText
    );

    console.log("QUERY SET");
    console.log(query);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText) return; // add this line to prevent empty input
    setLoading(true);
    try {
      let question =
        inputText +
        "\n\nAnswer the above question with respect to the context below. The response should not exceed 300 characters:-\n" +
        parsedText;
      console.log(".....", question, ".....");
      const response = await fetch("/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // set loading state to false after finishing the form submission
    }
  };

  const [pdfFile, setPdfFile] = useState(null);
  const [parsedText, setParsedText] = useState(null);

  const handlePdfFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };
  const handlePdfFileUpload = () => {
    setLoading(true); // set loading state to true
    const formData = new FormData();
    formData.append("pdfFile", pdfFile);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((text) => setParsedText(text))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)); // set loading state to false after finishing the upload
  };

  return (
    <div className="App">
      <div>
        <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
        <button onClick={handlePdfFileUpload}>Upload</button>
        {loading && <Loading />}

        {parsedText && <div>{parsedText}</div>}
        {/* {console.log(parsedText)} */}
      </div>

      <h1>Ask GPT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input type="text" value={inputText} onChange={handleInputChange} />
        </label>
        <button type="submit">Ask</button>
      </form>
      {loading && <Loading />}

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
