import { Box, Button, Container, FormControl, FormLabel, Input, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { Link } from '@src/components/common';
import { AuthLayout } from '@src/components/layouts';
import { ROUTE_PATHS } from '@src/constants/routes.constants';

export const LoginPage = observer(() => {
  return (
    <AuthLayout>
      <Container maxW="container.sm">
        <Text fontSize="4xl" as="b">
          Log In
        </Text>

        <Box mt={10} mb={6}>
          <form>
            <FormControl mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button mt={6} colorScheme="blue" type="submit" w="100%">
              Log in
            </Button>
          </form>
        </Box>

        <Wrap as="b" justify="center">
          <WrapItem>
            <div>Do not have a SaigonChildren account?</div>
          </WrapItem>
          <WrapItem>
            <Link to={ROUTE_PATHS.SIGNUP}>Create an account</Link>
          </WrapItem>
        </Wrap>
      </Container>
    </AuthLayout>
  );
});
