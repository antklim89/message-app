import { createFileRoute } from '@tanstack/react-router';

import { SearchPage, SearchPageParamsSchema } from '@/pages/search';
import { PageErrorComponent } from '@/shared/ui/page-error-component';

export const Route = createFileRoute('/search')({
  component() {
    const searchParams = Route.useSearch();
    return <SearchPage searchParams={searchParams} />;
  },
  validateSearch: SearchPageParamsSchema,
  errorComponent: PageErrorComponent,
});
