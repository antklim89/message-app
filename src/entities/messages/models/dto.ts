import type { Database } from '@/shared/model/supabase-types.generated';
import type { MessageBody, MessageType } from './types';

export function messageDto(data: Database['public']['Views']['messages_view']['Row']): MessageType {
  return {
    answerId: data.answerId ?? undefined,
    answersCount: data.answersCount ?? 0,
    author: {
      avatar: data.avatar ?? undefined,
      id: data.authorId as string,
      username: data.username as string,
    },
    authorId: data.authorId as string,
    body: data.body as unknown as MessageBody,
    created: data.created as string,
    hasLiked: data.hasLiked ?? false,
    id: data.id as string,
    isFavorite: data.isFavorite ?? false,
    likesCount: data.likesCount ?? 0,

    embeddedItems: data.embeddedItems ?? undefined,
    embeddedType: data.embeddedType ?? undefined,
  };
}
