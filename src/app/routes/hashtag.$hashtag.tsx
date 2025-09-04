import { createFileRoute } from '@tanstack/react-router';

import { HashtagPage, HashtagPageParamsSchema, preloadHashtagPage } from '@/pages/hashtag';

export const Route = createFileRoute('/hashtag/$hashtag')({
  component() {
    const params = Route.useParams();
    return <HashtagPage params={params} />;
  },
  loader: preloadHashtagPage,
  params: HashtagPageParamsSchema,
});
