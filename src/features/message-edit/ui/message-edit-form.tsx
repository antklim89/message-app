import type { RefObject } from 'react';
import { Box, type BoxProps, HStack, Stack } from '@chakra-ui/react';
import type { LexicalEditor, SerializedRootNode } from 'lexical';

import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MessageBodyLengthPlugin } from './lexcical-plugins/message-body-length-plugin';
import { FormatButtonsPlugin } from './lexcical-plugins/message-format-buttons-plugin';
import { MessageLinkPlugin } from './lexcical-plugins/message-link-plugin';
import { MessageSelectUserPlugin } from './lexcical-plugins/message-select-user-plugin';

export const MessageEditForm = ({
  value,
  ref,
  ...props
}: {
  value?: SerializedRootNode;
  ref: RefObject<LexicalEditor | null>;
} & BoxProps) => {
  return (
    <Box {...props} asChild w="full">
      <RichTextEditor
        ref={ref}
        value={value}
        plugins={
          <Stack>
            <HStack mt={2}>
              <MessageSelectUserPlugin />
              <MessageLinkPlugin />
              <Box flexGrow={1} />
              <MessageBodyLengthPlugin />
            </HStack>
            <HStack mt={2}>
              <FormatButtonsPlugin />
            </HStack>
          </Stack>
        }
      />
    </Box>
  );
};
