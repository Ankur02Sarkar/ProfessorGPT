import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Button,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import Loading from "./Loading";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function Professor() {
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
    if (!inputText) return;
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
      setLoading(false);
    }
  };

  const [pdfFile, setPdfFile] = useState(null);
  const [parsedText, setParsedText] = useState(null);

  const handlePdfFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };
  const handlePdfFileUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("pdfFile", pdfFile);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((text) => setParsedText(text))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
        bg="gray.800"
        color="white"
      >
        <Link to="/">
          <Heading as="h1" size="xl" mb="10" textAlign="center">
            Welcome to ProfessorGPT
          </Heading>
        </Link>

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
          <Input type="file" onChange={handlePdfFileChange} />
          <Button colorScheme="green" mt="4" onClick={handlePdfFileUpload}>
            Upload
          </Button>
          {loading && <Loading />}
        </Box>

        <Box
          p="4"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
          mb="8"
          width="70%"
        >
          <form onSubmit={handleSubmit}>
            <Text fontSize="xl" mb="4">
              Question:
            </Text>
            <Input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              mb="4"
            />

            <Button colorScheme="green" type="submit" mb="4">
              Ask
            </Button>
          </form>
          {loading && <Loading />}

          {result && (
            <Textarea
              placeholder=""
              size={"lg"}
              mb="4"
              value={result}
              bg="gray.700"
              color="white"
              _placeholder={{ color: "gray.400" }}
              isReadOnly
            />
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Professor;