import { Button, Skeleton } from '@chakra-ui/react';

import { SuspenseErrorBoundary } from '@/shared/ui/suspense-error-boundary';
import { MessageCardFallback } from '@/widgets/message-card';
import { MessageListFallback } from '@/widgets/message-list';
import { AnswersCreateLayout } from './answers-create-layout';
import { AnswersListLayout } from './answers-list-layout';

export function AnswersPage({ params }: { params: { answerId: number } }) {
  return (
    <>
      <SuspenseErrorBoundary
        fallback={
          <>
            <Skeleton asChild>
              <Button my={4}>&larr; BACK</Button>
            </Skeleton>
            <MessageCardFallback />
            <Skeleton h={30} my={4} />
          </>
        }
      >
        <AnswersCreateLayout answerId={params.answerId} />
      </SuspenseErrorBoundary>

      <SuspenseErrorBoundary
        fallback={
          <MessageListFallback>
            <MessageCardFallback />
          </MessageListFallback>
        }
      >
        <AnswersListLayout answerId={params.answerId} />
      </SuspenseErrorBoundary>
    </>
  );
}
