import { Box, Button, Skeleton } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import { FaChevronLeft } from 'react-icons/fa6';

import { messageListQueryOptions, messageQueryOptions } from '@/entities/messages';
import { MessageCreateCollapsible } from '@/features/message-edit';
import { AwaitQuery } from '@/shared/ui/await-query';
import { Protected } from '@/shared/ui/protected';
import { MessageCard, MessageCardFallback } from '@/widgets/message-card';
import { MessageList, MessageListFallback } from '@/widgets/message-list';

export function AnswersPage({ params }: { params: { answerId: number } }) {
  const messageListQuery = useInfiniteQuery(messageListQueryOptions({ answerId: params.answerId }));
  const messageQuery = useQuery(messageQueryOptions({ id: params.answerId }));

  const { buildLocation } = useRouter();

  return (
    <>
      <AwaitQuery
        query={messageQuery}
        fallback={
          <>
            <Skeleton asChild>
              <Button>&larr; BACK</Button>
            </Skeleton>
            <MessageCardFallback />
            <Skeleton h={30} />
          </>
        }
      >
        {message => {
          const { href: backHref } = buildLocation(
            message.answerId ? { params: { answerId: message.answerId }, to: '/answers/$answerId' } : { to: '/' },
          );
          return (
            <>
              <Button variant="ghost" asChild alignSelf="self-start">
                <Link to={backHref}>
                  <FaChevronLeft />
                  BACK
                </Link>
              </Button>
              <MessageCard message={message} deleteRedirectUrl={backHref} />
              <Protected
                fallback={<Skeleton h={30} />}
                privateElement={
                  <MessageCreateCollapsible
                    answerId={message.answerId}
                    trigger={<Button variant="outline">Answer to this message.</Button>}
                  />
                }
                publicElement={<Box h={30} />}
              />
            </>
          );
        }}
      </AwaitQuery>

      <AwaitQuery query={messageListQuery} fallback={<MessageListFallback />}>
        {messages => (
          <MessageList {...messageListQuery} loadingNextFallBack={<MessageListFallback />}>
            {messages.map(message => (
              <MessageCard key={message.id} message={message} />
            ))}
          </MessageList>
        )}
      </AwaitQuery>
    </>
  );
}
