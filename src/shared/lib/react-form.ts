import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { Form } from '../ui/react-form/form';
import { InputField } from '../ui/react-form/input-field';
import { TextareaField } from '../ui/react-form/textarea-field';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    TextareaField,
  },
  formComponents: {
    Form,
  },
});
