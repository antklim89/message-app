import type { ReactNode } from 'react';
import { IconButton, Tabs } from '@chakra-ui/react';

import type { MessageEmbeddedType } from '@/shared/model/message-embedded-type';

export function MessageCreateTabTrigger({
  value,
  embeddedType,
  icon,
}: {
  embeddedType: MessageEmbeddedType;
  value?: string;
  icon: ReactNode;
}) {
  return (
    <Tabs.Trigger value={value === embeddedType ? 'null' : embeddedType} asChild unstyled>
      <IconButton variant={value === embeddedType ? 'solid' : 'outline'}>{icon}</IconButton>
    </Tabs.Trigger>
  );
}
