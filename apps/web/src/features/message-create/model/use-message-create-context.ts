import { createContext, use } from 'react';

import type { MessageCreateContextType } from './types';

export const MessageCreateContext = createContext<MessageCreateContextType | null>(null);

export function useMessageCreateContext() {
  const messageCreateContext = use(MessageCreateContext);
  if (!messageCreateContext) throw new Error('No MessageCreateContext');

  return messageCreateContext;
}
