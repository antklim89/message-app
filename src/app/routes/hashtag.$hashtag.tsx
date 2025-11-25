import { createFileRoute } from '@tanstack/react-router';

import { HashtagPage, HashtagPageParamsSchema, preloadHashtagPage } from '@/pages/hashtag';
import { ErrorComponent } from '@/shared/ui/error-component';

export const Route = createFileRoute('/hashtag/$hashtag')({
  component() {
    const params = Route.useParams();
    return <HashtagPage params={params} />;
  },
  errorComponent: ErrorComponent,
  loader: preloadHashtagPage,
  params: HashtagPageParamsSchema,
});
