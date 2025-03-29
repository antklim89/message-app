import { Button } from '@chakra-ui/react';
import type { z } from 'zod';
import { useLoginForm } from '@/features/auth/hooks/use-auth-form';
import type { LoginSchema } from '@/features/auth/schemas';
import { AuthFormField } from './auth-field';
import { FormContainer } from './form-container';


export function LoginForm({ onSubmit }: { onSubmit: (data: z.infer<typeof LoginSchema>) => void }) {
  const form = useLoginForm();

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
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
      <Button type="submit">Submit</Button>
    </FormContainer>
  );
}
