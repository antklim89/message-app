import type { EmbedState } from '@message-app/entities/messages';
import type { SerializedEditorState } from '@message-app/rich-text';

export interface MessageEditType {
  body: SerializedEditorState;
  embed: EmbedState;
}
