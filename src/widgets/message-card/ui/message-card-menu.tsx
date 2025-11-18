import { lazy, Suspense } from 'react';
import { IconButton, Menu, Portal, Skeleton, useDialog } from '@chakra-ui/react';
import { FaEllipsis, FaPencil, FaTrash } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { MessageDeleteDialog } from '@/features/message-delete';
import { MessageUpdateDialog } from '@/features/message-edit';
import { Protected } from '@/shared/ui/protected';

const MessageCardMenuCopyUser = lazy(() =>
  import('./message-card-menu-copy-user').then(m => ({ default: m.MessageCardMenuCopyUser })),
);
const MessageCardMenuCopyUrl = lazy(() =>
  import('./message-card-menu-copy-url').then(m => ({ default: m.MessageCardMenuCopyUrl })),
);

export function MessageCardMenu({ message, deleteRedirectUrl }: { message: MessageType; deleteRedirectUrl?: string }) {
  const updateMessageDialog = useDialog();
  const deleteMessageDialog = useDialog();

  return (
    <>
      <MessageUpdateDialog message={message} dialog={updateMessageDialog} />
      <MessageDeleteDialog id={message.id} deleteRedirectUrl={deleteRedirectUrl} dialog={deleteMessageDialog} />

      <Menu.Root lazyMount positioning={{ placement: 'bottom-end' }} size="md">
        <Menu.Trigger asChild>
          <IconButton aria-label="message menu" variant="ghost">
            <FaEllipsis />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup cursor="pointer">
                <Suspense
                  fallback={
                    <Skeleton>
                      <Menu.Item value="">Menu</Menu.Item>
                    </Skeleton>
                  }
                >
                  <MessageCardMenuCopyUrl message={message} />
                </Suspense>

                <Suspense
                  fallback={
                    <Skeleton>
                      <Menu.Item value="">Menu</Menu.Item>
                    </Skeleton>
                  }
                >
                  <MessageCardMenuCopyUser {...message.author} />
                </Suspense>

                <Protected
                  authorId={message.authorId}
                  privateElement={
                    <>
                      <Menu.Separator />

                      <Menu.Item onClick={() => updateMessageDialog.setOpen(true)} value="update-message">
                        <FaPencil /> Update
                      </Menu.Item>

                      <Menu.Item
                        onClick={() => deleteMessageDialog.setOpen(true)}
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
