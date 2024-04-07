import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

export const SignupForm = () => {
  return (
    <form>
      <FormControl mb={4}>
        <FormLabel>Username</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Button mt={6} colorScheme="blue" type="submit" w="100%">
        Sign Up
      </Button>
    </form>
  );
};
