import {
  Box,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';
import { AuthDialog } from './ui/auth-dialog';


export function Auth({ type: _type }: { type: 'login' | 'register' }) {
  const [type, setType] = useState(_type);

  return (
    <AuthDialog buttonText={_type === 'login' ? 'Login' : 'Register'}>
      <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gap="4">
        <Box
          as="aside"
          flex={1}
          margin="auto 0"
        >
          <Heading>Login</Heading>
          <Text textAlign="center">
            Thanks for using our app!
            <br />
            Please
            {' '}
            <Button
              p={1}
              variant="ghost"
              verticalAlign="baseline"
              onClick={() => setType('login')}
            >
              login
            </Button>
            {' '}
            or
            {' '}
            <Button
              p={1}
              variant="ghost"
              verticalAlign="baseline"
              onClick={() => setType('register')}
            >register
            </Button>
            {' '}
            to continue.
          </Text>
        </Box>
        <Box
          as="section"
          flex={1}
          margin="auto 0"
        >
          {type === 'login'
            ? <LoginForm onSubmit={data => console.log(data)} />
            : <RegisterForm onSubmit={data => console.log(data)} />}
        </Box>
      </Box>
    </AuthDialog>
  );
}
