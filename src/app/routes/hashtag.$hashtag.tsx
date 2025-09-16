import { createFileRoute } from '@tanstack/react-router';

import { HashtagPage, HashtagPageParamsSchema, preloadHashtagPage } from '@/pages/hashtag';
import { PageErrorComponent } from '@/shared/ui/page-error-component';

export const Route = createFileRoute('/hashtag/$hashtag')({
  component() {
    const params = Route.useParams();
    return <HashtagPage params={params} />;
  },
  errorComponent: PageErrorComponent,
  loader: preloadHashtagPage,
  params: HashtagPageParamsSchema,
});
