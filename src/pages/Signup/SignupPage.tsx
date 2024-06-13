import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';  // Moved up
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Stack,
  SimpleGrid,
  Wrap,
  WrapItem,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { Link } from '@src/components/common';
import { AuthLayout } from '@src/components/layouts';
import { ROUTE_PATHS } from '@src/constants/routes.constants';
import { auth, db } from '../../firebase';

enum Role {
  MENTOR = 'Mentor',
  MENTEE = 'Mentee',
}

const RoleValues = Object.values(Role);

export const SignupPage = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(Role.MENTOR);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      setTimeout(() => {
        setPasswordError('');
      }, 5000);
      return; // Stop the form submission
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setTimeout(() => {
        setPasswordError('');
      }, 5000);
      return; // Stop the form submission
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        email,
        role: selectedRole,
      });
      navigate(ROUTE_PATHS.LOGIN);
      console.log('Account Created Successfully');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setPasswordError('This email is already in use. Please use a different email');
      } else if (err.code === 'auth/weak-password') {
        setPasswordError('Password must be longer than 6 characters. Please try a different password');
      } else {
        console.error('Signup failed: ', err.message);
        setPasswordError('Failed to create account. Please try again later');
      }
    }
  };

  const renderRoleButton = () =>
    RoleValues.map((role) => (
      <Button
        key={role}
        colorScheme="blue"
        variant={selectedRole === role ? 'solid' : 'outline'}
        onClick={() => setSelectedRole(role)}
      >
        {role}
      </Button>
    ));

  return (
    <AuthLayout>
      <Container maxW="container.sm">
        <Stack spacing={3}>
          <Text fontSize="4xl" as="b">
            Sign Up
          </Text>
          <Text fontSize="md" color="gray.500" as="b">
            Join SaigonChildren as a
          </Text>
          <SimpleGrid columns={2} mt={4} spacing={2}>
            {renderRoleButton()}
          </SimpleGrid>
        </Stack>

        <Box mt={10} mb={6}>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && password.length < 6 && (
                <Text mt={2} color="red.500">
                  <WarningIcon mr={2} /> Password must be at least 6 characters long
                </Text>
              )}
              {password.length >= 6 && (
                <Text mt={2} color="green.500">
                  <CheckIcon mr={2} /> Password is valid
                </Text>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && <Text color="red.500">{passwordError}</Text>}
            </FormControl>
            <Button mt={6} colorScheme="blue" type="submit" w="100%">
              Sign Up
            </Button>
          </form>
        </Box>

        <Wrap as="b" justify="center">
          <WrapItem>
            <div>Already have a SaigonChildren account?</div>
          </WrapItem>
          <WrapItem>
            <Link to={ROUTE_PATHS.LOGIN}>Log in</Link>
          </WrapItem>
        </Wrap>
      </Container>
    </AuthLayout>
  );
};


