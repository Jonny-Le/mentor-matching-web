import { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate(ROUTE_PATHS.LOGIN);
      
      // Redirect the user or update UI to show successful login
    } catch (err: any) {
      switch (err.code) {

        case 'auth/missing-email':
          console.error('Missing email');
          setPasswordError('Missing email');
          setTimeout(() => {
            setPasswordError('');
          }, 5000);
          break;

        case 'auth/invalid-email':
          console.error('Invalid email entered');
          setPasswordError('Invalid email');
          setTimeout(() => {
            setPasswordError('');
          }, 5000);
          break;

        case 'auth/missing-password':
          setPasswordError('Missing password');
          setTimeout(() => {
            setPasswordError('');
          }, 5000);
          break;

        case 'auth/user-not-found':
          console.error('No user found with this email');
          setPasswordError('No user found with this email.');
          setTimeout(() => {
            setPasswordError('');
          }, 5000);
          break;

        case 'auth/wrong-password':
          console.error('Incorrect password');
          setPasswordError('Incorrect password');
          setTimeout(() => {
            setPasswordError('');
          }, 5000);
          break;
        
        case 'auth/invalid-credential':
          console.error('Invalid credentials');
          setPasswordError('Incorrect email and/or password');
          setTimeout(() => {
            setPasswordError('');
          }, 5000);
          break;

        default:
          console.error('Login failed:', err.message);
        
      }
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
              {passwordError && <Text color="red.500">{passwordError}</Text>}
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
