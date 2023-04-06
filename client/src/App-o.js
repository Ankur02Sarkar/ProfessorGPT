import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { BsFillSendFill } from "react-icons/bs";

function App() {
  const [query, setQuery] = useState("");
  const [parsedText, setParsedText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleBsFillSendFillClick = async () => {
    try {
      const {
        data: { message },
      } = await axios.get("http://localhost:8000/api", {
        params: { query },
      });
      setData((prevData) => [...prevData, { query, response: message }]);
      setQuery("");
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("http://localhost:8000/pdf", formData)
      .then((response) => {
        console.log(response);
        setParsedText(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    // <div>
    //   {console.log(parsedText)}
    //   <input type="file" onChange={fileSelectedHandler} />
    //   <button onClick={fileUploadHandler}>Upload</button>
    // </div>

    <div className="container">
      <h1>Welcome to ProfessorGPT</h1>
      <form>
        <label>
          Query:
          <input type="text" value={query} onChange={handleInputChange} />
        </label>
        <BsFillSendFill onClick={handleBsFillSendFillClick} />
      </form>
      <div className="grid-container">
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
    </div>
  );
}

export default App;
