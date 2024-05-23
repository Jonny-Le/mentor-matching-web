import { useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@src/firebase';

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password);
      console.log('account created');
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
        Sign Up
      </Button>
    </form>
  );
};
