import { Box, Container, Image } from '@chakra-ui/react';
import logo from '@src/assets/img/saigonchildrenlogo.png';

export const Header = () => {
  return (
    <Box boxShadow="base" py={4}>
      <Container maxW="container.lg">
        <Image src={logo} w="20%" objectFit="cover" />
      </Container>
    </Box>
  );
};
