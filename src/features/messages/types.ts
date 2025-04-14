export interface MessageType {
  id: string;
  body: string;
  title: string;
  answerTo?: string;
  created: string;
  updated: string;
}

export type MessageCreateType = Pick<MessageType, 'body' | 'title'>;
export type MessageUpdateType = MessageCreateType;
