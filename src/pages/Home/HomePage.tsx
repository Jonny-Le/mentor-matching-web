import { useNavigate } from 'react-router-dom';
import { Button, Center, Stack } from '@chakra-ui/react';
import { ROUTE_PATHS } from '@src/constants/routes.constants';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Center height="100vh">
      <Stack spacing={4}>
        <Button onClick={() => navigate(ROUTE_PATHS.LOGIN)}>Log In</Button>
        <Button onClick={() => navigate(ROUTE_PATHS.SIGNUP)}>Sign up</Button>
      </Stack>
    </Center>
  );
};
