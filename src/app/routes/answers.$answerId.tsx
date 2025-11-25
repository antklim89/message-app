import { createFileRoute } from '@tanstack/react-router';

import { AnswersPage, AnswersPageParamsSchema, preloadAnswersPage } from '@/pages/answers';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/answers/$answerId')({
  component() {
    const params = Route.useParams();
    return <AnswersPage params={params} />;
  },
  loader: preloadAnswersPage,
  params: AnswersPageParamsSchema,
  errorComponent: ErrorComponent,
});
