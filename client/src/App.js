<<<<<<< HEAD
import React, { useState } from "react";
// import axios from "axios";
import Loading from "./Loading";
function App() {
  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
=======
// import React, { useState } from "react";
// // import axios from "axios";

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState("");
>>>>>>> origin/main

//   const handleInputChange = (e) => setInputText(e.target.value);
//   const consoleLog = (e) => {
//     setQuery(
//       inputText +
//         "\n\nAnswer the above question with respect to the context below. The response should not exceed 300 characters:-\n" +
//         parsedText
//     );

//     console.log("QUERY SET");
//     console.log(query);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!inputText) return; // add this line to prevent empty input

//     try {
//       let question =
//         inputText +
//         "\n\nAnswer the above question with respect to the context below. The response should not exceed 300 characters:-\n" +
//         parsedText;
//       console.log(".....", question, ".....");
//       const response = await fetch("/generate-content", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ question }),
//       });

//       const data = await response.json();
//       setResult(data.message);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const [pdfFile, setPdfFile] = useState(null);
//   const [parsedText, setParsedText] = useState(null);

//   const handlePdfFileChange = (event) => {
//     setPdfFile(event.target.files[0]);
//   };

//   const handlePdfFileUpload = () => {
//     const formData = new FormData();
//     formData.append("pdfFile", pdfFile);
//     fetch("/upload", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.text())
//       .then((text) => setParsedText(text))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <>
//     <div className="App">
//       <div>
//         <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
//         <button onClick={handlePdfFileUpload}>Upload</button>
//         {/* {parsedText && <div>{parsedText}</div>} */}
//         {/* {console.log(parsedText)} */}
//       </div>

//       <h1>Ask GPT</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Question:
//           <input type="text" value={inputText} onChange={handleInputChange} />
//         </label>
//         <button type="submit">Ask</button>
//       </form>
//       {result && (
//         <div>
//           <h2>Result:</h2>
//           <p dangerouslySetInnerHTML={{ __html: result }}></p>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import {
  Flex,
  Box,
  Button,
  Text,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

function PdfUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [answerContent, setAnswerContent] = useState("");
  const toast = useToast();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
<<<<<<< HEAD
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
=======

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
>>>>>>> origin/main
    }

    // Upload logic here
    // ...

    toast({
      title: "File uploaded",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleQuestionTitleChange = (event) => {
    setQuestionTitle(event.target.value);
  };
<<<<<<< HEAD
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
=======

  const handleQuestionContentChange = (event) => {
    setQuestionContent(event.target.value);
  };

  const handleAnswerContentChange = (event) => {
    setAnswerContent(event.target.value);
  };

  const handleQuestionSubmit = () => {
    // Handle question submission here
    // ...

    toast({
      title: "Question submitted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Box
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        textAlign="center"
        mb="8"
      >
        <Text fontSize="xl" mb="4">
          Upload a PDF file
        </Text>
        <input type="file" onChange={handleFileChange} />
        <Button mt="4" onClick={handleUpload}>
          Upload
        </Button>
      </Box>
      <Box
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        textAlign="center"
      >
        <Text fontSize="xl" mb="4">
          Ask a question
        </Text>
        <Textarea
          placeholder="Enter the question details"
          mb="4"
          value={questionContent}
          onChange={handleQuestionContentChange}
        />
        <Button onClick={handleQuestionSubmit} mb="4">
          Submit question
        </Button>
        <Textarea
          placeholder="Enter the answer details"
          size={'lg'}
          mb="4"
          value={answerContent}
          onChange={handleAnswerContentChange}
        />
      </Box>
    </Flex>
>>>>>>> origin/main
  );
}

export default PdfUploadPage;



