import { useRef } from 'react';
import { useDialogContext } from '@chakra-ui/react';
import type { EmbedState } from '@message-app/entities/messages';
import { MAX_MESSAGE_BODY_LENGTH, MIN_MESSAGE_BODY_LENGTH } from '@message-app/entities/messages';
import {
  AppExtension,
  configExtension,
  defineExtension,
  LexicalExtensionComposer,
  RichTextEditor,
  type SerializedEditorState,
  UserSelectExtension,
} from '@message-app/rich-text';
import { Dialog } from '@message-app/ui/components/dialog';
import { useMutation } from '@tanstack/react-query';

import { queryClient, trpc } from '@/shared/lib/trpc';
import { EmbedPanel, EmbedPanelContent } from './components/embed-panel';
import { EmbedTabs } from './components/embed-tabs';

const appExtension = defineExtension({
  name: '@message-app/create-message',
  dependencies: [
    AppExtension,
    configExtension(UserSelectExtension, {
      async onQuerySearchChange(queryString) {
        if (!queryString || queryString.length < 2) return [];
        return await queryClient.query(trpc.user.getUsers.queryOptions({ name: queryString }));
      },
    }),
  ],
});

export function MessageCreateDialog({ answerId }: { answerId: string | undefined }) {
  const dialog = useDialogContext();
  const embedStateRef = useRef<EmbedState>({ type: 'null' });
  const messageCreateMutation = useMutation(trpc.messages.create.mutationOptions({}));

  async function handleSubmit(body: SerializedEditorState) {
    const result = await messageCreateMutation.mutateAsync({ answerId, body, embed: { type: 'null' } });
    console.log('🚀 ~ result: \n%o\n', result);

    dialog.setOpen(false);
  }

  return (
    <Dialog.Body p={0}>
      <LexicalExtensionComposer extension={appExtension} contentEditable={null}>
        <EmbedTabs>
          <RichTextEditor
            maxLength={MAX_MESSAGE_BODY_LENGTH}
            minLength={MIN_MESSAGE_BODY_LENGTH}
            onSubmit={body => handleSubmit(body)}
            panelSlot={<EmbedPanel />}
            contentSlot={
              <EmbedPanelContent
                onChange={embedState => {
                  embedStateRef.current = embedState;
                }}
              />
            }
          />
        </EmbedTabs>
      </LexicalExtensionComposer>
    </Dialog.Body>
  );
}
