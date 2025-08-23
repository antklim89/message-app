import { Menu } from '@chakra-ui/react';
import { FaPencil, FaTrash } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { MessageDeleteDialog, MessageUpdateDialog } from '@/features/message-edit';
import { Protected } from '@/share/ui/protected';
import { MessageCardMenuCopyUrl } from './message-card-menu-copy-url';

export function MessageCardMenu({ message, deleteRedirectUrl }: { message: MessageType; deleteRedirectUrl?: string }) {
  return (
    <Menu.ItemGroup>
      <MessageCardMenuCopyUrl answerId={message.id} />

      <Protected
        checkIsPublic={user => user?.id !== message.authorId}
        privateElement={
          <MessageUpdateDialog
            message={message}
            trigger={
              <Menu.Item as="button" value="update-message">
                <FaPencil /> Update
              </Menu.Item>
            }
          />
        }
      />
      <Protected
        checkIsPublic={user => user?.id !== message.authorId}
        privateElement={
          <MessageDeleteDialog
            id={message.id}
            deleteRedirectUrl={deleteRedirectUrl}
            trigger={
              <Menu.Item as="button" asChild value="delete-message">
                <FaTrash /> Delete
              </Menu.Item>
            }
          />
        }
      />
    </Menu.ItemGroup>
  );
}
