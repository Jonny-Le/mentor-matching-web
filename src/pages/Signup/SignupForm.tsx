import {useState} from 'react'

import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import {auth} from '/Users/prachiheda/Desktop/mentor-matching-web/src/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';


export const SignupForm = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const handleSubmit = async (e: { preventDefault: () => void; }) =>{
    e.preventDefault()
    try{
      createUserWithEmailAndPassword(auth, email,password)
      console.log("account created")
    } catch(err){
      console.log(err)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Username</FormLabel>
        <Input type="email" onChange = {(e)=>setEmail(e.target.value)}/>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" onChange = {(e)=>setPassword(e.target.value)}/>
      </FormControl>
      <Button mt={6} colorScheme="blue" type="submit" w="100%">
        Sign Up
      </Button>
    </form>
  );
};
