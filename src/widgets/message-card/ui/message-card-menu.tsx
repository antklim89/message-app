import { Button, Menu } from '@chakra-ui/react';

import type { MessageType } from '@/entities/messages';
import { MessageUpdateDialog } from '@/features/message-edit';
import { MessageDeleteDialog } from '@/features/message-edit/ui/message-delete-dialog';
import { Protected } from '@/share/ui/protected';

export function MessageCardMenu({ message }: { message: MessageType }) {
  return (
    <Menu.ItemGroup>
      <Protected
        privateElement={
          <MessageUpdateDialog
            message={message}
            trigger={
              <Menu.Item cursor="pointer" value="update-message" asChild>
                <Button w="full" variant="ghost">
                  Update
                </Button>
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
              <Menu.Item cursor="pointer" value="delete-message" asChild>
                <Button w="full" variant="ghost">
                  Delete
                </Button>
              </Menu.Item>
            }
          />
        }
      />
    </Menu.ItemGroup>
  );
}
