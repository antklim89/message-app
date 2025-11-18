import type { z } from 'zod/v4-mini';

import type { ReportCreateSchema } from './schemas';

export type ReportCreateType = z.infer<typeof ReportCreateSchema>;
