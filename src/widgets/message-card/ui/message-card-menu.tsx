import { Menu } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { FaCopy, FaPencil, FaTrash } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { MessageDeleteDialog, MessageUpdateDialog } from '@/features/message-edit';
import { Protected } from '@/share/ui/protected';

export function MessageCardMenu({ message }: { message: MessageType }) {
  const { href } = useRouter().buildLocation({ params: { answerId: message.id }, to: '/answers/$answerId' });
  const fullPath = `${location.origin}${href}`;

  return (
    <Menu.ItemGroup>
      <Menu.Item as="button" asChild onClick={() => navigator.clipboard?.writeText(fullPath)} value="copy-url">
        <FaCopy /> Copy URL
      </Menu.Item>

      <Protected
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
        privateElement={
          <MessageDeleteDialog
            id={message.id}
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
