import { lazy, Suspense } from 'react';
import { IconButton, Menu, Portal, Skeleton, useDialog } from '@chakra-ui/react';
import { FaEllipsis, FaTrash } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { MessageCreateDialog } from '@/features/create-report';
import { MessageDeleteDialog } from '@/features/message-delete';
import { Protected } from '@/shared/ui/protected';

const MessageCardMenuCopyUserPromise = import('./message-card-menu-copy-user').then(m => ({
  default: m.MessageCardMenuCopyUser,
}));
const MessageCardMenuCopyUrlPromise = import('./message-card-menu-copy-url').then(m => ({
  default: m.MessageCardMenuCopyUrl,
}));

const MessageCardMenuCopyUser = lazy(() => MessageCardMenuCopyUserPromise);
const MessageCardMenuCopyUrl = lazy(() => MessageCardMenuCopyUrlPromise);

export function MessageCardMenu({ message, deleteRedirectUrl }: { message: MessageType; deleteRedirectUrl?: string }) {
  const deleteMessageDialog = useDialog();
  const createReportDialog = useDialog();

  return (
    <>
      <MessageDeleteDialog id={message.id} deleteRedirectUrl={deleteRedirectUrl} dialog={deleteMessageDialog} />
      <MessageCreateDialog messageId={message.id} dialog={createReportDialog} />

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

                <Menu.Item onClick={() => createReportDialog.setOpen(true)} as="button" value="create-report">
                  <FaTrash /> Report
                </Menu.Item>

                <Protected
                  authorId={message.authorId}
                  privateElement={
                    <>
                      <Menu.Separator />

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
