import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const tmpPath = join(tmpdir(), 'message_app');
