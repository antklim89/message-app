import type { Ref } from 'react';
import { Textarea, type TextareaProps } from '@chakra-ui/react';

import { useFieldContext } from '@/shared/lib/react-form';
import { BaseField } from './base-field';

export function TextareaField({
  label,
  ref,
  ...props
}: { ref?: Ref<HTMLTextAreaElement>; label?: string } & TextareaProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label}>
      <Textarea
        ref={ref}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        {...props}
      />
    </BaseField>
  );
}
