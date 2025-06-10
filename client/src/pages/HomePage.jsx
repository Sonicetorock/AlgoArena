import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text, SimpleGrid, Button, VStack, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { Carousel } from 'react-bootstrap';
import { FaCode, FaUsers, FaTrophy, FaBook, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const features = [
    {
      icon: FaCode,
      title: 'Practice Coding',
      description: 'Access a vast collection of programming problems and improve your coding skills.'
    },
    {
      icon: FaUsers,
      title: 'Community',
      description: 'Join a community of developers, share solutions, and learn from others.'
    },
    {
      icon: FaTrophy,
      title: 'Contests',
      description: 'Participate in regular coding contests and win exciting prizes.'
    },
    {
      icon: FaBook,
      title: 'Learning Resources',
      description: 'Access comprehensive tutorials and learning materials.'
    },
    {
      icon: FaChartLine,
      title: 'Track Progress',
      description: 'Monitor your progress with detailed analytics and performance metrics.'
    }
  ];

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Software Engineer',
      text: 'This platform helped me land my dream job at a top tech company!'
    },
    {
      name: 'Jane Smith',
      role: 'Computer Science Student',
      text: 'The best platform for practicing coding problems and preparing for interviews.'
    },
    {
      name: 'Mike Johnson',
      role: 'Competitive Programmer',
      text: 'Regular contests and a great community make this platform stand out.'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Summer Coding Challenge',
      date: 'June 15, 2025',
      description: 'A month-long coding challenge with exciting prizes'
    },
    {
      title: 'Algorithm Masterclass',
      date: 'August 20, 2025',
      description: 'Learn advanced algorithms from industry experts'
    },
    {
      title: 'Hackathon 2025',
      date: 'July 1, 2025',
      description: 'Build innovative solutions and win amazing prizes'
    }
  ];

  return (
    <Box>
      {/* Hero Section with Carousel */}
      <Carousel className="mb-8">
        {upcomingEvents.map((event, index) => (
          <Carousel.Item key={index}>
            <Box
              h="400px"
              bg="blue.500"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              p={8}
            >
              <VStack spacing={4}>
                <Heading size="2xl">{event.title}</Heading>
                <Text fontSize="xl">{event.date}</Text>
                <Text fontSize="lg">{event.description}</Text>
                <Button
                  colorScheme="orange"
                  size="lg"
                  onClick={() => handleNavigation('/contests')}
                >
                  Learn More
                </Button>
              </VStack>
            </Box>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Features Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <Heading textAlign="center">Why Choose Our Platform?</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {features.map((feature, index) => (
              <Box
                key={index}
                p={6}
                bg={cardBgColor}
                rounded="lg"
                shadow="lg"
                _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s' }}
              >
                <VStack spacing={4} align="start">
                  <Icon as={feature.icon} w={10} h={10} color="blue.500" />
                  <Heading size="md">{feature.title}</Heading>
                  <Text color="gray.600">{feature.description}</Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Benefits Section */}
      <Box bg={bgColor} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading textAlign="center">Benefits of Using Our Platform</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Box p={6} bg={cardBgColor} rounded="lg" shadow="md">
                <VStack align="start" spacing={4}>
                  <Heading size="md">For Students</Heading>
                  <Text>• Prepare for technical interviews</Text>
                  <Text>• Learn from detailed solutions</Text>
                  <Text>• Track your progress</Text>
                  <Text>• Join coding competitions</Text>
                </VStack>
              </Box>
              <Box p={6} bg={cardBgColor} rounded="lg" shadow="md">
                <VStack align="start" spacing={4}>
                  <Heading size="md">For Professionals</Heading>
                  <Text>• Keep your skills sharp</Text>
                  <Text>• Network with other developers</Text>
                  <Text>• Participate in hackathons</Text>
                  <Text>• Access advanced problems</Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <Heading textAlign="center">What Our Users Say</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {testimonials.map((testimonial, index) => (
              <Box
                key={index}
                p={6}
                bg={cardBgColor}
                rounded="lg"
                shadow="md"
                textAlign="center"
              >
                <VStack spacing={4}>
                  <Text fontSize="lg" fontStyle="italic">
                    "{testimonial.text}"
                  </Text>
                  <Text fontWeight="bold">{testimonial.name}</Text>
                  <Text color="gray.600">{testimonial.role}</Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Call to Action */}
      <Box bg="blue.500" color="white" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading>Ready to Start Your Coding Journey?</Heading>
            <Text fontSize="xl">Join thousands of developers who are already improving their skills</Text>
            <Button
              size="lg"
              colorScheme="orange"
              onClick={() => handleNavigation('/register')}
            >
              Get Started Now
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
