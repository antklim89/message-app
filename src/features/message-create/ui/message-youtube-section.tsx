import { Field, Input } from '@chakra-ui/react';
import type { AnyFieldApi } from '@tanstack/react-form';

import { EmbeddedYoutube } from '@/shared/ui/embedded-youtube';

export function MessageYoutubeSection({ field }: { field: AnyFieldApi }) {
  return (
    <Field.Root invalid={!field.state.meta.isValid}>
      <Field.Label>YouTube video ID or URL</Field.Label>
      <Input
        placeholder="https://youtu.be/FzdR61qe0gg?si=UofM98why3lJmJst"
        onChange={e => {
          const value = e.target.value;

          const videoId = extractVideoIdParam(value);
          field.handleChange(videoId || value);
        }}
      />
      {field.state.meta.isValid && <EmbeddedYoutube videoId={field.state.value} />}
      <Field.ErrorText>{field.state.meta.errors.map(err => err?.message)}</Field.ErrorText>
    </Field.Root>
  );
}

function extractVideoIdParam(url: string) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    }
    if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.split('/')[1];
    }
  } catch {
    return null;
  }
  return null;
}
