import type { ReactNode } from 'react';
import { IconButton, Tabs, useTabsContext } from '@chakra-ui/react';
import { EmbedType } from '@message-app/entities/messages';

export function EmbedTabs({ children }: { children: ReactNode }) {
  return <Tabs.Root lazyMount>{children}</Tabs.Root>;
}

export function EmbedTabsTrigger({ children, value }: { children: ReactNode; value: string }) {
  const tabs = useTabsContext();

  return (
    <Tabs.Trigger unstyled value={value} asChild>
      <IconButton
        size="sm"
        onClick={e => {
          e.preventDefault();
          tabs.setValue(tabs.value === value ? EmbedType.NULL : value);
        }}
        variant={tabs.value === value ? 'subtle' : 'ghost'}
      >
        {children}
      </IconButton>
    </Tabs.Trigger>
  );
}

export function EmbedTabsContent({ children, value }: { children: ReactNode; value: string }) {
  return (
    <Tabs.Content value={value} borderLeft="sm" borderRight="sm" borderColor="bg.muted" p={0}>
      {children}
    </Tabs.Content>
  );
}
