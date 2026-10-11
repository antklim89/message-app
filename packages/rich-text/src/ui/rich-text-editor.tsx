import type { ReactNode } from 'react';
import { Box, Span, Textarea } from '@chakra-ui/react';
import { ExtensionComponent } from '@lexical/react/ExtensionComponent';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import type { SerializedEditorState } from 'lexical';

import { RichTextEmojiPlugin, RichTextEmojiProviderPlugin, RichTextEmojiTriggerPlugin } from './emoji-plugin';
import { FormatMenu } from './format-menu-plugin';
import { SubmitExtension } from './submit-extension';

export function RichTextEditor({
  placeholder = 'Enter your message...',
  onSubmit,
  panelSlot,
  contentSlot,
  maxLength,
  minLength,
  disabled,
}: {
  placeholder?: string;
  onSubmit: (textContent: SerializedEditorState) => Promise<void>;
  panelSlot?: ReactNode;
  contentSlot?: ReactNode;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
}) {
  return (
    <RichTextEmojiProviderPlugin>
      <FormatMenu leftSlot={<RichTextEmojiTriggerPlugin />} rightSlot={panelSlot} />
      {contentSlot}
      <Box position="relative">
        <Textarea asChild minHeight="48" paddingBottom="16" borderTopRadius="none">
          <ContentEditable
            aria-placeholder={placeholder}
            placeholder={
              <Span
                color="currentcolor/50"
                left="0.75rem"
                position="absolute"
                top="0.75rem"
                userSelect="none"
                zIndex={-1}
              >
                {placeholder}
              </Span>
            }
          />
        </Textarea>
        <ExtensionComponent
          lexical:extension={SubmitExtension}
          onSubmit={onSubmit}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
        />
      </Box>
      <RichTextEmojiPlugin />
    </RichTextEmojiProviderPlugin>
  );
}
