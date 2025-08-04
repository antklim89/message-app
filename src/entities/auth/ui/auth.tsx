import { AuthForm } from './auth-form';
import { useLoginMutation } from '../api/hooks/use-login-mutation';
import { useRegisterMutation } from '../api/hooks/use-register-mutation';
import type { LoginSchema, RegisterSchema } from '../models/schemas';

export function Auth({ type }: { type: 'login' | 'register' }) {
  const { mutateAsync: login } = useLoginMutation();
  const { mutateAsync: register } = useRegisterMutation();

  function handleAuth(data: LoginSchema | RegisterSchema) {
    if (type === 'register') return register(data as RegisterSchema);
    else return login(data as LoginSchema);
  }

  return <AuthForm onSubmit={handleAuth} type={type} />;
}
