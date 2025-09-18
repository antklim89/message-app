import { Menu, useDisclosure } from '@chakra-ui/react';
import { FaPencil, FaTrash } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { MessageDeleteDialog, MessageUpdateDialog } from '@/features/message-edit';
import { Protected } from '@/shared/ui/protected';
import { MessageCardMenuCopyUrl } from './message-card-menu-copy-url';

export function MessageCardMenu({ message, deleteRedirectUrl }: { message: MessageType; deleteRedirectUrl?: string }) {
  const disclosure = useDisclosure();

  return (
    <>
      <MessageUpdateDialog message={message} disclosure={disclosure} />
      <Menu.ItemGroup cursor="pointer">
        <MessageCardMenuCopyUrl answerId={message.id} />

        <Protected
          authorId={message.authorId}
          privateElement={
            <>
              <Menu.Separator />

              <Menu.Item onClick={disclosure.onOpen} as="button" value="update-message">
                <FaPencil /> Update
              </Menu.Item>

              <MessageDeleteDialog
                id={message.id}
                deleteRedirectUrl={deleteRedirectUrl}
                openElement={
                  <Menu.Item
                    color="fg.error"
                    _hover={{ bg: 'bg.error', color: 'fg.error' }}
                    as="button"
                    value="delete-message"
                  >
                    <FaTrash /> Delete
                  </Menu.Item>
                }
              />
            </>
          }
        />
      </Menu.ItemGroup>
    </>
  );
}
