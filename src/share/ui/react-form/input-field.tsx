import { Input, type InputProps } from '@chakra-ui/react';

import { useFieldContext } from '@/share/lib/react-form';
import { BaseField } from './base-field';

export function InputField({ label, ...props }: { label?: string } & InputProps) {
  const field = useFieldContext<string>();

  return (
    <BaseField label={label}>
      <Input
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        {...props}
      />
    </BaseField>
  );
}
