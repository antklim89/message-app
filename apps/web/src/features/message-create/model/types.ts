import type { Dispatch, SetStateAction, TransitionStartFunction } from 'react';
import type { EmbedState, EmbedStateRecord } from '@message-app/entities/messages';
import type { SerializedEditorState } from '@message-app/rich-text';

export interface MessageCreateContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  embedState: Partial<EmbedStateRecord>;
  setEmbedState: Dispatch<SetStateAction<Partial<EmbedStateRecord>>>;
}

export interface MessageEditType {
  body: SerializedEditorState;
  embed: EmbedState;
}
