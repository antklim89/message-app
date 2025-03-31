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
      <Box
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        gap="4"
        alignItems={{base: 'stretch', lg: 'center'}}
        justifyContent="center"
      >
        <Box
          as="aside"
          flex={{base: '0 1 0', lg: '0 1 320px'}}
          flexDirection="column"
        >
            <Heading fontSize="4xl" mb={4}>{type === 'login' ? 'Login' : 'Register'}</Heading>
            <Text fontSize="xl">
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
          flex={{base: '0 1 0', lg: '0 1 320px'}}
        >
          {type === 'login'
            ? <LoginForm onSubmit={data => console.log(data)} />
            : <RegisterForm onSubmit={data => console.log(data)} />}
          </Box>
      </Box>
    </AuthDialog>
  );
}
