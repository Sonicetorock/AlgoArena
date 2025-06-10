import React from 'react'
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center" justify="center" minH="70vh">
        <Box w="full" maxW="450px">
          <img src="/404_PageNotFound.svg" alt="404 Not Found" style={{ width: '100%', height: 'auto' }} />
        </Box>
        <VStack spacing={4}>
          <Heading as="h1" size="2xl" color="blue.500">
            Oops! Page Not Found
          </Heading>
          <Text fontSize="xl" color="gray.600" textAlign="center">
            The page you're looking for doesn't exist or has been moved.
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate('/')}
            mt={4}
          >
            Back to Home
          </Button>
        </VStack>
      </VStack>
    </Container>
  )
}

export default NotFound
