import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Icon, VStack, Flex } from '@chakra-ui/react';
import { FaCode, FaUsers, FaTrophy, FaLightbulb } from 'react-icons/fa';
import AboutUsSVG from '/AboutUs.svg';

const Feature = ({ icon, title, text }) => {
  return (
    <VStack
      p={6}
      bg="white"
      rounded="xl"
      boxShadow="lg"
      spacing={4}
      align="start"
      transition="transform 0.3s ease"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      <Icon as={icon} w={10} h={10} color="blue.500" />
      <Heading size="md">{title}</Heading>
      <Text color="gray.600">{text}</Text>
    </VStack>
  );
};

const AboutUsPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      {/* Hero Section */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        gap={10}
        mb={16}
      >
        <Box flex="1">
          <img src={AboutUsSVG} alt="About Us" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
        <Box flex="1">
          <Heading size="2xl" mb={6} color="blue.600">
            Welcome to AlgoArena
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>
            AlgoArena is your premier destination for competitive programming and algorithmic challenges. 
            We provide a platform where programmers can enhance their skills, compete with peers, 
            and prepare for technical interviews.
          </Text>
          <Text fontSize="lg" color="gray.600">
            Our mission is to create a vibrant community of programmers who learn, grow, 
            and succeed together in the world of competitive programming.
          </Text>
        </Box>
      </Flex>

      {/* Features Section */}
      <Box mb={16}>
        <Heading textAlign="center" mb={10} color="blue.600">
          Why Choose AlgoArena?
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          <Feature
            icon={FaCode}
            title="Quality Problems"
            text="Curated collection of algorithmic problems with varying difficulty levels"
          />
          <Feature
            icon={FaUsers}
            title="Active Community"
            text="Join a thriving community of programmers and learn together"
          />
          <Feature
            icon={FaTrophy}
            title="Regular Contests"
            text="Participate in weekly coding contests and win exciting prizes"
          />
          <Feature
            icon={FaLightbulb}
            title="Learning Resources"
            text="Access comprehensive learning materials and tutorials"
          />
        </SimpleGrid>
      </Box>

      {/* Team Section */}
      <Box>
        <Heading textAlign="center" mb={10} color="blue.600">
          Our Team
        </Heading>
        <Text textAlign="center" fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
          We are a dedicated team of programming enthusiasts and educators committed to 
          making competitive programming accessible and enjoyable for everyone. Our team 
          works tirelessly to create an engaging platform that helps programmers achieve 
          their goals.
        </Text>
      </Box>
    </Container>
  );
};

export default AboutUsPage; 