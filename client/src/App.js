import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { BsFillSendFill } from "react-icons/bs";

function App() {
  const [query, setQuery] = useState("");
  const [parsedText, setParsedText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [contents, setContents] = useState("");
  const [filename, setFilename] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://localhost:8000/pdf", formData);
    setContents(response.data.contents);
    setFilename(file.name)
    const pdfContext = await axios.get("http://localhost:8000/api", {
      params: {
        query: "All of the following questions must be answered strictly according to the following context :- \n"
          + response.data.contents
      },
    })
  };
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleBsFillSendFillClick = async () => {
    try {
      const {
        data: { message },
      } = await axios.get("http://localhost:8000/api", {
        params: {
          query:
            query
          // + "\n Answer the above question with respect to the context below. The response should not exceed 300 characters :- \n" +
          // contents,
        },
      });
      setData((prevData) => [...prevData, { query, response: message }]);
      setQuery("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to ProfessorGPT</h1>
      <div align="center" className="formDiv">
        <form onSubmit={handleSubmit}>
          <label>
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Scan PDF</button>
        </form>
      </div>
      {/* {
        contents && (
           axios.get("http://localhost:8000/api", {
            params: {
              query: "All of the following questions must be answered strictly according to the following context :- \n"
                + contents
            },
          })
        )
      } */}
      {(contents && <>
        <div className="grid-container">
          <div className="">
            <div className="response">
              <p>{filename} has been Scanned</p>
            </div>
          </div>
          {data.map((item, index) => (
            <div key={index} className="query-response">
              <div className="query">
                <p>{item.query}</p>
              </div>
              <div className="response">
                <p>{item.response}</p>
              </div>
            </div>
          ))}
        </div>
        <div align="center" className="formDiv queryForm">
          <form className="">
            <label>
              <input type="text" value={query} onChange={handleInputChange} />
            </label>
            <BsFillSendFill className="sendIcon" onClick={handleBsFillSendFillClick} />
          </form>
        </div>

      </>)}
    </div>
  );
}

export default App;
