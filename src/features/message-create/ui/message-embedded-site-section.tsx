import { Field, Input } from '@chakra-ui/react';
import type { AnyFieldApi } from '@tanstack/react-form';

import { EmbeddedSite } from '@/shared/ui/embedded-site';

export function MessageEmbeddedSiteSection({ field }: { field: AnyFieldApi }) {
  return (
    <Field.Root invalid={!field.state.meta.isValid}>
      <Field.Label>External link</Field.Label>
      <Input
        defaultValue="https://"
        placeholder="https://example.com"
        onChange={e => {
          field.handleChange(e.target.value);
        }}
      />
      <Field.ErrorText>{field.state.meta.errors.map(err => err?.message)}</Field.ErrorText>
      {field.state.meta.isValid && <EmbeddedSite url={field.state.value} />}
    </Field.Root>
  );
}
