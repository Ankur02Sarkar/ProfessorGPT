import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const ProfessorGPT = () => {
  return (
    <Box bgGradient="linear(to-b, blue.800, blue.900)" minH='100vh'>
      <Box maxW='xl' mx='auto' py={20} px={4}>
        <Heading as='h1' size='3xl' mb={8} textAlign='center' color='white'>
          Welcome to ProfessorGPT
        </Heading>
        <Text fontSize='xl' mb={16} textAlign='center' color='white'>
          The ultimate language model for academic writing and research
        </Text>
        <Button
          colorScheme='blue'
          size='lg'
          mb={4}
          w='full'
          _hover={{ bg: 'blue.600' }}
          _active={{ bg: 'blue.700' }}
          _focus={{ outline: 'none' }}
          transition='all 0.2s ease-in-out'
        >
          Get started
        </Button>
      </Box>
    </Box>
  );
};

export default ProfessorGPT;
