
import { useState } from 'react';
import {
  Container, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Text, 
  Box, 
  Center,
  Stack,
  SimpleGrid,

} 
from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from '@src/components/common';
import { AuthLayout } from '@src/components/layouts';
import { ROUTE_PATHS } from '@src/constants/routes.constants';
import { auth } from "../../firebase";

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;  // Stop the form submission
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('account created');
    } catch (err) {
      console.log(err);
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
          <Text fontSize="4xl" as="b">Sign Up</Text>
          <Text fontSize="md" color="gray.500" as="b">Join SaigonChildren as a</Text>
          <SimpleGrid columns={2} mt={4} spacing={2}>
            {renderRoleButton()}
          </SimpleGrid>
        </Stack>

        <Box mt={10} mb={6}>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
              {passwordError && <Text color="red.500">{passwordError}</Text>}
            </FormControl>
            <Button mt={6} colorScheme="blue" type="submit" w="100%">
              Sign Up
            </Button>
          </form>
        </Box>

        <Center textAlign="center">
          <Text as="b">
            <Link to={ROUTE_PATHS.LOGIN}>Already have an account?</Link>
          </Text>
        </Center>
      </Container>
    </AuthLayout>
  );
};
