import { type InferDataFromTag, queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import type { MessageType } from '../../models/types';
import { getMessage } from '../repository/get-message';

export const MessageQueryOptionsBaseKey = 'MESSAGE';
export type MessageQueryOptionsReturnType = InferDataFromTag<
  ReturnType<typeof messageQueryOptions>['queryFn'],
  ReturnType<typeof messageQueryOptions>['queryKey']
>;

export function messageQueryOptions({ id }: { id: MessageType['id'] }) {
  return queryOptions({
    async queryFn() {
      const { fail, error, result } = await getMessage(id);
      if (fail) throw error;
      return result;
    },
    queryKey: [MessageQueryOptionsBaseKey, { id }],
  });
}

export function useMessageQuery(...args: Parameters<typeof messageQueryOptions>) {
  return useSuspenseQuery(messageQueryOptions(...args));
}
