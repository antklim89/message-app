import { formOptions, revalidateLogic } from '@tanstack/react-form';

import { LoginSchema, RegisterSchema } from '../models/schemas';

export const loginFormOptions = formOptions({
  validators: {
    onDynamic: LoginSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: {
    email: '',
    password: '',
  },
});

export const registerFormOptions = formOptions({
  validators: {
    onDynamic: RegisterSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: {
    // displayname: '',
    username: '',
    email: '',
    password: '',
    repeat: '',
  },
});
