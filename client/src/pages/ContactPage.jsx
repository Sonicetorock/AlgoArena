import React from 'react';
import { Box, Container, Heading, Text, Input, Textarea, Button, VStack, HStack, useToast } from '@chakra-ui/react';
import ContactUsSVG from '/ContactUs.svg';

const ContactPage = () => {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    toast({
      title: 'Message Sent!',
      description: "We'll get back to you soon.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gap={10} alignItems="center">
        {/* Left side - SVG */}
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <img src={ContactUsSVG} alt="Contact Us" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>

        {/* Right side - Form */}
        <Box flex="1" bg="white" p={8} borderRadius="lg" boxShadow="lg">
          <VStack spacing={6} align="stretch">
            <Heading size="xl" color="blue.600">Get in Touch</Heading>
            <Text color="gray.600">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</Text>
            
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Input
                  placeholder="Your Name"
                  size="lg"
                  required
                  borderColor="gray.300"
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                />
                
                <Input
                  type="email"
                  placeholder="Your Email"
                  size="lg"
                  required
                  borderColor="gray.300"
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                />
                
                <Textarea
                  placeholder="Your Message"
                  size="lg"
                  required
                  minH="150px"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                />
                
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  bg="blue.600"
                  _hover={{ bg: 'blue.700' }}
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactPage; 