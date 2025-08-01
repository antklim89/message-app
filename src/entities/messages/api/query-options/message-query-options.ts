import { queryOptions } from '@tanstack/react-query';

import type { MessageType } from '../../models/types';
import { getMessage } from '../repository/get-message';

export function messageQueryOptions({ id }: { id: MessageType['id'] }) {
  return queryOptions({
    queryKey: ['MESSAGE', { id }],
    async queryFn() {
      const { fail, error, result } = await getMessage(id);
      if (fail) throw new Error(error.message);
      return result;
    },
  });
}
