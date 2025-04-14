import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { LoginSchema, RegisterSchema } from '../schemas';

export function useRegisterForm() {
  return useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
}

export function useLoginForm() {
  return useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
}
