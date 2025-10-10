import { lazy, Suspense } from 'react';
import { IconButton, Menu, Portal, SkeletonText, useDisclosure } from '@chakra-ui/react';
import { FaEllipsis, FaPencil, FaTrash } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { MessageDeleteDialog, MessageUpdateDialog } from '@/features/message-edit';
import { Protected } from '@/shared/ui/protected';
import { MessageCardMenuCopyUrl } from './message-card-menu-copy-url';

const MessageCardMenuCopyUser = lazy(() =>
  import('./message-card-menu-copy-user').then(m => ({ default: m.MessageCardMenuCopyUser })),
);

export function MessageCardMenu({ message, deleteRedirectUrl }: { message: MessageType; deleteRedirectUrl?: string }) {
  const updateMessageDisclosure = useDisclosure();
  const deleteMessageDisclosure = useDisclosure();

  return (
    <>
      <MessageUpdateDialog message={message} disclosure={updateMessageDisclosure} />
      <MessageDeleteDialog id={message.id} deleteRedirectUrl={deleteRedirectUrl} disclosure={deleteMessageDisclosure} />

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

                      <Menu.Item onClick={updateMessageDisclosure.onOpen} as="button" value="update-message">
                        <FaPencil /> Update
                      </Menu.Item>

                      <Menu.Item
                        onClick={deleteMessageDisclosure.onOpen}
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
