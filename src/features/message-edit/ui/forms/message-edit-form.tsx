import type { RefObject } from 'react';
import { Box, type BoxProps, HStack, Stack } from '@chakra-ui/react';
import type { LexicalEditor, SerializedRootNode } from 'lexical';

import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MessageBodyLengthPlugin } from '../plugins/message-body-length-plugin';
import { FormatButtonsPlugin } from '../plugins/message-format-buttons-plugin';
import { MessageLinkPlugin } from '../plugins/message-link-plugin';
import { MessageSelectUserPlugin } from '../plugins/message-select-user-plugin';
import { MessageSubmitPlugin } from '../plugins/message-submit-plugin';

export const MessageEditForm = ({
  value,
  ref,
  onEnterKeyDown,
  ...props
}: {
  value?: SerializedRootNode;
  ref: RefObject<LexicalEditor | null>;
  onEnterKeyDown?: () => Promise<void>;
} & BoxProps) => {
  return (
    <Box {...props} asChild w="full">
      <RichTextEditor
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
              <MessageSubmitPlugin ref={ref} onEnterKeyDown={onEnterKeyDown} />
            </HStack>
          </Stack>
        }
      />
    </Box>
  );
};
