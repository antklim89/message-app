import type { MessageType } from '@/features/messages';
import { createPocketbaseClient } from '@/lib/pocketbase';
import { errAuthentication, ok } from '@/lib/result';

export async function addLike({ messageId }: { messageId: MessageType['id'] }) {
  const pb = await createPocketbaseClient();

  const user = pb.authStore.record;
  if (user == null) return errAuthentication();

  await pb.collection('likes').create({ message: messageId, author: user.id }, { fields: 'id' });
  return ok(null);
}

export async function removeLike({ messageId }: { messageId: MessageType['id'] }) {
  const pb = await createPocketbaseClient();

  const user = pb.authStore.record;
  if (user == null) return errAuthentication();

  const { id: likeId } = await pb
    .collection('likes')
    .getFirstListItem(`message = '${messageId}' && author = '${user.id}'`, { fields: 'id' });

  await pb.collection('likes').delete(likeId);
  return ok(null);
}
