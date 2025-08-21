import { type InferDataFromTag, queryOptions } from '@tanstack/react-query';

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
      if (fail) throw new Error(error.message);
      return result;
    },
    queryKey: [MessageQueryOptionsBaseKey, { id }],
  });
}
