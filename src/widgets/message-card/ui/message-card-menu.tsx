import { Menu } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { FaCopy, FaPencil, FaTrash } from 'react-icons/fa6';

import type { MessageType } from '@/entities/messages';
import { MessageUpdateDialog } from '@/features/message-edit';
import { MessageDeleteDialog } from '@/features/message-edit/ui/message-delete-dialog';
import { Protected } from '@/share/ui/protected';

export function MessageCardMenu({ message }: { message: MessageType }) {
  const { href } = useRouter().buildLocation({ params: { answerId: message.id }, to: '/answers/$answerId' });
  const fullPath = `${location.origin}${href}`;

  return (
    <Menu.ItemGroup>
      <Menu.Item onClick={() => navigator.clipboard?.writeText(fullPath)} as="button" value="copy-url" asChild>
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
              <Menu.Item as="button" value="delete-message" asChild>
                <FaTrash /> Delete
              </Menu.Item>
            }
          />
        }
      />
    </Menu.ItemGroup>
  );
}
