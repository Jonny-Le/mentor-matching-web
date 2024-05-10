import { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { observer } from 'mobx-react';
import { Link } from '@src/components/common';
import { AuthLayout } from '@src/components/layouts';
import { ROUTE_PATHS } from '@src/constants/routes.constants';
import { auth } from "../../firebase";



export const LoginPage = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('login success');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthLayout>
      <Container maxW="container.sm">
        <Text fontSize="4xl" as="b">
          Log In
        </Text>

        <Box mt={10} mb={6}>
        <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} />
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
