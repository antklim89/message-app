import { Menu } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { FaCopy } from 'react-icons/fa6';

import { type MessageType } from '@/entities/messages';

export function MessageCardMenuCopyUrl({ answerId }: { answerId: MessageType['id'] }) {
  const { href } = useRouter().buildLocation({ params: { answerId }, to: '/answers/$answerId' });
  const fullPath = `${location.origin}${href}`;

  return (
    <Menu.Item as="button" asChild onClick={() => navigator.clipboard?.writeText(fullPath)} value="copy-url">
      <FaCopy /> Copy URL
    </Menu.Item>
  );
}
