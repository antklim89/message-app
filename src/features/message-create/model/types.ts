import type { z } from 'zod/v4-mini';

import type { MessageCreateSchema } from './schemas';

export type MessageEditType = z.infer<typeof MessageCreateSchema>;
