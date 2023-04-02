import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box bg="gray.800" minH="100vh">
      <Box maxW="xl" mx="auto" py={20} px={4}>
        <Heading as="h1" size="3xl" mb={8} textAlign="center" color="white">
          Welcome to ProfessorGPT
        </Heading>
        <Text fontSize="xl" mb={16} textAlign="center" color="white">
          The ultimate language model for academic writing and research
        </Text>
        <Link to="/ask">
          <Button
            as="button"
            colorScheme="blue"
            size="lg"
            mb={4}
            w="full"
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
            _focus={{ outline: "none" }}
            transition="all 0.2s ease-in-out"
          >
            Get started
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default LandingPage;
