import { useNavigate } from 'react-router-dom';
import { Box, Container, Image, Button, Flex } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';

import logo from '@src/assets/img/saigonchildrenlogo.png';
import { auth } from '@src/firebase';

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Box boxShadow="base" py={4}>
      <Container maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Image src={logo} w="20%" objectFit="cover" />
          <Button colorScheme="blue" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};
