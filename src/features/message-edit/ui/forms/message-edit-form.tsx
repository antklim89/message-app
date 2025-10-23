import type { RefObject } from 'react';
import type { LexicalEditor, SerializedRootNode } from 'lexical';

import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MAX_MESSAGE_BODY_LENGTH } from '../../config/constants';
import { MessageSelectUserPlugin } from '../plugins/message-select-user-plugin';

export const MessageEditForm = ({
  value,
  ref,
  onEnterKeyDown,
}: {
  value?: SerializedRootNode;
  ref: RefObject<LexicalEditor | null>;
  onEnterKeyDown?: () => Promise<void>;
}) => {
  return (
    <RichTextEditor
      ref={ref}
      value={value}
      onEnterKeyDown={onEnterKeyDown}
      maxLength={MAX_MESSAGE_BODY_LENGTH}
      plugins={<MessageSelectUserPlugin />}
    />
  );
};
