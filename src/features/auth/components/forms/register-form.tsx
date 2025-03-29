import { Button } from '@chakra-ui/react';
import type { z } from 'zod';
import { useRegisterForm } from '@/features/auth/hooks/use-auth-form';
import type { RegisterSchema } from '@/features/auth/schemas';
import { AuthFormField } from './auth-field';
import { FormContainer } from './form-container';


export function RegisterForm({ onSubmit }: { onSubmit: (data: z.infer<typeof RegisterSchema>) => void }) {
  const form = useRegisterForm();

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <AuthFormField
        form={form}
        label="Username"
        name="username"
        placeholder="Enter your username"
      />
      <AuthFormField
        form={form}
        label="E-mail"
        name="email"
        placeholder="Enter your email address"
      />
      <AuthFormField
        form={form}
        label="Password"
        name="password"
        placeholder="Enter your password"
      />
      <AuthFormField
        form={form}
        label="Password repeat"
        name="repeat"
        placeholder="Repeat your password"
      />
      <Button type="submit">Submit</Button>
    </FormContainer>
  );
}
