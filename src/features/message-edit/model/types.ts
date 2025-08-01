import type { MessageType } from '@/entities/messages';

export type MessageCreateType = Pick<MessageType, 'title' | 'body' | 'answerToId'>;
