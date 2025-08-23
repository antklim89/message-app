import { Box, Button, Skeleton } from '@chakra-ui/react';
import { Link, useRouter } from '@tanstack/react-router';
import { FaChevronLeft } from 'react-icons/fa6';

import { MessageFallback, useMessageQuery } from '@/entities/messages';
import { MessageCreateCollapsible } from '@/features/message-edit';
import { withSuspenseErrorBoundary } from '@/share/ui/hoc/with-suspense-error-boundary';
import { Protected } from '@/share/ui/protected';
import { MessageCard } from '@/widgets/message-card';

export const MessageAnswerLayout = withSuspenseErrorBoundary(
  ({ answerId }: { answerId: number }) => {
    const messageQuery = useMessageQuery({ id: answerId });
    const { href: backHref } = useRouter().buildLocation(
      messageQuery.data.answerId
        ? { params: { answerId: messageQuery.data.answerId }, to: '/answers/$answerId' }
        : { to: '/' },
    );

    return (
      <>
        <Button my={4} variant="ghost" asChild>
          <Link to={backHref}>
            <FaChevronLeft />
            BACK
          </Link>
        </Button>
        <MessageCard message={messageQuery.data} deleteRedirectUrl={backHref} />
        <Protected
          fallback={<Skeleton h={30} />}
          privateElement={
            <MessageCreateCollapsible
              answerId={answerId}
              trigger={
                <Button my={4} variant="outline">
                  Answer to this message.
                </Button>
              }
            />
          }
          publicElement={<Box h={30} />}
        />
      </>
    );
  },
  <MessageFallback />,
);
