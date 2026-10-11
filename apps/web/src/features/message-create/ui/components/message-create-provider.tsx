import { type ReactNode, useMemo, useState, useTransition } from 'react';

import type { MessageCreateContextType } from '../../model/types';
import { MessageCreateContext } from '../../model/use-message-create-context';

export function MessageCreateProvider({ children }: { children: ReactNode }) {
  const [embedState, setEmbedState] = useState<MessageCreateContextType['embedState']>({ null: { type: 'null' } });
  const [isPending, startTransition] = useTransition();

  const value = useMemo<MessageCreateContextType>(
    () => ({ embedState, setEmbedState, isPending, startTransition }),
    [embedState, isPending],
  );

  return <MessageCreateContext value={value}>{children}</MessageCreateContext>;
}
