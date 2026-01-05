import { Box, Container, Heading, Text, Button, Stack, Image, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.400, purple.500)',
    'linear(to-r, blue.600, purple.700)'
  );

  return (
    <Box
      bgGradient={bgGradient}
      color="white"
      py={{ base: 16, md: 24 }}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="7xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={8}
          align="center"
          justify="space-between"
        >
          <Stack spacing={6} maxW={{ base: 'full', md: '2xl' }}>
            <Heading
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Welcome to Rock Store 🎸
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} opacity={0.9}>
              Discover amazing products at unbeatable prices. Shop the latest collection
              and enjoy seamless shopping experience with our modern e-commerce platform.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <Button
                as={Link}
                to="/"
                size="lg"
                bg="white"
                color="purple.600"
                _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
                transition="all 0.3s"
                shadow="lg"
              >
                Shop Now
              </Button>
              <Button
                as={Link}
                to="/create"
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                transition="all 0.3s"
              >
                Add Product
              </Button>
            </Stack>
          </Stack>

          <Box
            display={{ base: 'none', md: 'block' }}
            position="relative"
          >
            <Box
              w="400px"
              h="400px"
              position="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500"
                alt="Shopping"
                borderRadius="lg"
                boxShadow="2xl"
                objectFit="cover"
                w="full"
                h="full"
              />
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* Decorative Elements */}
      <Box
        position="absolute"
        top="-50px"
        right="-50px"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="whiteAlpha.100"
        filter="blur(60px)"
      />
      <Box
        position="absolute"
        bottom="-50px"
        left="-50px"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="whiteAlpha.100"
        filter="blur(60px)"
      />
    </Box>
  );
};

export default HeroSection;
