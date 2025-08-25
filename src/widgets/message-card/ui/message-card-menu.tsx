import { Menu } from '@chakra-ui/react';
import { FaPencil, FaTrash } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { MessageDeleteDialog, MessageUpdateDialog } from '@/features/message-edit';
import { Protected } from '@/shared/ui/protected';
import { MessageCardMenuCopyUrl } from './message-card-menu-copy-url';

export function MessageCardMenu({ message, deleteRedirectUrl }: { message: MessageType; deleteRedirectUrl?: string }) {
  return (
    <Menu.ItemGroup cursor="pointer">
      <MessageCardMenuCopyUrl answerId={message.id} />

      <Protected
        checkIsPublic={user => user?.id !== message.authorId}
        privateElement={
          <>
            <Menu.Separator />

            <MessageUpdateDialog
              message={message}
              trigger={
                <Menu.Item as="button" value="update-message">
                  <FaPencil /> Update
                </Menu.Item>
              }
            />

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
  );
}
