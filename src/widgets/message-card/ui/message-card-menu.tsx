import { lazy, Suspense } from 'react';
import { IconButton, Menu, Portal, SkeletonText, useDialog } from '@chakra-ui/react';
import { FaEllipsis, FaPencil, FaTrash } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { MessageDeleteDialog } from '@/features/message-delete';
import { MessageUpdateDialog } from '@/features/message-edit';
import { Protected } from '@/shared/ui/protected';
import { MessageCardMenuCopyUrl } from './message-card-menu-copy-url';

const MessageCardMenuCopyUser = lazy(() =>
  import('./message-card-menu-copy-user').then(m => ({ default: m.MessageCardMenuCopyUser })),
);

export function MessageCardMenu({ message, deleteRedirectUrl }: { message: MessageType; deleteRedirectUrl?: string }) {
  const updateMessageDialog = useDialog();
  const deleteMessageDialog = useDialog();

  return (
    <>
      <MessageUpdateDialog message={message} dialog={updateMessageDialog} />
      <MessageDeleteDialog id={message.id} deleteRedirectUrl={deleteRedirectUrl} dialog={deleteMessageDialog} />

      <Menu.Root positioning={{ placement: 'bottom-end' }} size="md">
        <Menu.Trigger asChild>
          <IconButton aria-label="message menu" variant="ghost">
            <FaEllipsis />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup cursor="pointer">
                <MessageCardMenuCopyUrl answerId={message.id} />

                <Suspense fallback={<SkeletonText w="full" noOfLines={1} />}>
                  <MessageCardMenuCopyUser {...message.author} />
                </Suspense>

                <Protected
                  authorId={message.authorId}
                  privateElement={
                    <>
                      <Menu.Separator />

                      <Menu.Item onClick={() => updateMessageDialog.setOpen(true)} as="button" value="update-message">
                        <FaPencil /> Update
                      </Menu.Item>

                      <Menu.Item
                        onClick={() => deleteMessageDialog.setOpen(false)}
                        color="fg.error"
                        _hover={{ bg: 'bg.error', color: 'fg.error' }}
                        as="button"
                        value="delete-message"
                      >
                        <FaTrash /> Delete
                      </Menu.Item>
                    </>
                  }
                />
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
}
