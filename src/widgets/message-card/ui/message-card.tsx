import { Button, Menu } from '@chakra-ui/react';

import { FavoriteButton } from '@/entities/favorites';
import { Like } from '@/entities/likes';
import { Message, type MessageType } from '@/entities/messages';
import { MessageUpdateDialog } from '@/features/message-edit';
import { MessageDeleteDialog } from '@/features/message-edit/ui/message-delete-dialog';
import { Protected } from '@/share/ui/protected';

export function MessageCard({ message }: { message: MessageType }) {
  return (
    <Message
      menuItems={
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
      }
      message={message}
      footer={
        <>
          <Like messageId={message.id} hasLiked={message.hasLiked} likesCount={message.likesCount} />
          <FavoriteButton isFavorite={message.isFavorite} messageId={message.id} />
        </>
      }
    />
  );
}
