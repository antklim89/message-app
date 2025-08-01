import type { FileRoutesByPath } from '@tanstack/react-router';
import type { ResolveParams } from '@tanstack/router-core';
import { z } from 'zod/v4-mini';

export const parseMessageParams = (params: ResolveParams<FileRoutesByPath['/message/$messageId']['fullPath']>) => {
  const { success, data, error } = z
    .object({
      messageId: z.coerce.number({ error: 'Message id is invalid.' }),
    })
    .safeParse(params);

  if (!success) throw new Error(z.prettifyError(error));

  return data;
};
