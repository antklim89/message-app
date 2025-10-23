import type { RefObject } from 'react';
import type { LexicalEditor, SerializedRootNode } from 'lexical';

import { ProfileSelectLexicalPlugin } from '@/entities/profiles';
import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MAX_MESSAGE_BODY_LENGTH } from '../config/constants';

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
      plugins={<ProfileSelectLexicalPlugin />}
    />
  );
};
