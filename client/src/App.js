// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";
// import { BsFillSendFill } from "react-icons/bs";

// function App() {
//   const [query, setQuery] = useState("");
//   const [parsedText, setParsedText] = useState("");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);
//   const [contents, setContents] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("file", file);
//     const response = await axios.post("/pdf", formData);
//     setContents(response.data.contents);
//   };
//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleBsFillSendFillClick = async () => {
//     try {
//       const {
//         data: { message },
//       } = await axios.get("http://localhost:8000/api", {
//         params: {
//           query:
//             query +
//             "\n Answer the above question with respect to the context below. The response should not exceed 300 characters :- \n" +
//             contents,
//         },
//       });
//       setData((prevData) => [...prevData, { query, response: message }]);
//       setQuery("");
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   /*

//     const [selectedFile, setSelectedFile] = useState(null);
//     const fileSelectedHandler = (event) => {
//       setSelectedFile(event.target.files[0]);
//     };
//     const fileUploadHandler = () => {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       axios
//         .post("http://localhost:8000/pdf", formData)
//         .then((response) => {
//           console.log(response);
//           setParsedText(response.data);
//         })
//         .catch((error) => console.error(error))
//         .finally(() => setLoading(false));
//     };

//   */

//   return (
//     <div className="container">
//       <h1>Welcome to ProfessorGPT</h1>
//       <div align="center" className="formDiv">
//         <form onSubmit={handleSubmit}>
//           <label>
//             <input type="file" onChange={handleFileChange} />
//           </label>
//           <button type="submit">Scan PDF</button>
//         </form>
//       </div>
//       <div align="center" className="formDiv queryForm">
//         <form className="">
//           <label>
//             <input type="text" value={query} onChange={handleInputChange} />
//           </label>
//           <BsFillSendFill onClick={handleBsFillSendFillClick} />
//         </form>
//       </div>
//       <div className="grid-container">
//         {data.map((item, index) => (
//           <div key={index} className="query-response">
//             <div className="query">
//               <p>{item.query}</p>
//             </div>
//             <div className="response">
//               <p>{item.response}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App; 


import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [contents, setContents] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://localhost:8000/pdf", formData);
    setContents(response.data.contents);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">View PDF</button>
      </form>
      <div>{contents}</div>
    </div>
  );
}

export default App;
