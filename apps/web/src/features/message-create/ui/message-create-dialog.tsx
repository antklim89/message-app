import { useRef } from 'react';
import { useDialogContext } from '@chakra-ui/react';
import type { EmbedState } from '@message-app/entities/messages';
import { MAX_MESSAGE_BODY_LENGTH, MIN_MESSAGE_BODY_LENGTH } from '@message-app/entities/messages';
import {
  $getRoot,
  AppExtension,
  configExtension,
  defineExtension,
  LexicalExtensionComposer,
  RichTextEditor,
  type SerializedEditorState,
  UserSelectExtension,
  useLexicalComposerContext,
} from '@message-app/rich-text';
import { Dialog } from '@message-app/ui/components/dialog';
import { useMutation } from '@tanstack/react-query';

import { queryClient, trpc } from '@/shared/lib/trpc';
import { EmbedPanel, EmbedPanelContent } from './components/embed-panel';
import { EmbedTabs } from './components/embed-tabs';
import { MessageCreateProvider } from './components/message-create-provider';

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

export function MessageCreateDialogContent() {
  const dialog = useDialogContext();
  const [editor] = useLexicalComposerContext();

  const embedStateRef = useRef<EmbedState>({ type: 'null' });
  // const messageCreateMutation = useMutation(trpc.messages.create.mutationOptions({}));

  async function handleSubmit() {
    console.log(editor.getEditorState().toJSON());
    // const formData = new FormData();
    // formData.append('body', JSON.stringify(body));
    // if (embedStateRef.current.type === 'images') {
    //   embedStateRef.current.images.map(image => formData.append('images', image));
    // }

    // const result = await messageCreateMutation.mutateAsync({ answerId, body, embed: { type: 'null' } });
    // const result = await messageCreateMutation.mutate(formData);
    // console.log('🚀 ~ result: \n%o\n', result);

    dialog.setOpen(false);
  }

  return (
    <Dialog.Body p={0}>
      <EmbedTabs>
        <RichTextEditor
          maxLength={MAX_MESSAGE_BODY_LENGTH}
          minLength={MIN_MESSAGE_BODY_LENGTH}
          panelSlot={<EmbedPanel />}
          contentSlot={
            <EmbedPanelContent
              onChange={embedState => {
                console.log('🚀 ~ embedState: \n%o\n', embedState);
                embedStateRef.current = embedState;
              }}
            />
          }
        />
      </EmbedTabs>
    </Dialog.Body>
  );
}

export function MessageCreateDialog() {
  return (
    <LexicalExtensionComposer extension={appExtension} contentEditable={null}>
      <MessageCreateProvider>
        <MessageCreateDialogContent />
      </MessageCreateProvider>
    </LexicalExtensionComposer>
  );
}
