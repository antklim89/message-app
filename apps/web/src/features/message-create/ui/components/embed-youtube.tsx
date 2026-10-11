import { useState } from 'react';
import { Field, Input } from '@chakra-ui/react';
import { EmbeddedYoutube } from '@message-app/ui/components/embedded-youtube';
import { z } from 'zod/v4-mini';

export function EmbedYoutube({ onChange }: { onChange: (value: string) => void }) {
  const [value, setValue] = useState('');
  const isValidVideoId = z.string().check(z.length(11)).safeParse(value).success;
  return (
    <Field.Root py={2}>
      <Field.Label px="4" py="1">
        YouTube video ID or URL
      </Field.Label>
      <Input
        placeholder="https://youtu.be/FzdR61qe0gg?si=UofM98why3lJmJst"
        onChange={e => {
          const newVideoId = extractVideoIdParam(e.target.value);
          setValue(newVideoId);
          onChange(newVideoId);
        }}
      />
      {isValidVideoId && <EmbeddedYoutube videoId={value} />}
      {!isValidVideoId && <Field.ErrorText>Invalid video URL</Field.ErrorText>}
    </Field.Root>
  );
}

function extractVideoIdParam(url: string) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v') ?? url;
    }
    if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.split('/')[1] ?? url;
    }
  } catch {
    return url;
  }
  return url;
}
