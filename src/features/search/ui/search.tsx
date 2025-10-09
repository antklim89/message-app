import { Card, Heading, HStack, IconButton } from '@chakra-ui/react';
import { useLocation, useRouter } from '@tanstack/react-router';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import { useAppForm } from '@/shared/lib/react-form';
import { SearchForm, searchFormOptions } from './search-form';

export function Search() {
  const router = useRouter();
  const defaultSearch = useLocation({ select: state => state.search.s });

  const searchForm = useAppForm({
    ...searchFormOptions,
    defaultValues: { search: defaultSearch ?? '' },
    async onSubmit({ value }) {
      await router.navigate({ to: '/search', search: { s: value.search } });
    },
  });

  return (
    <Card.Root width="full">
      <Card.Body>
        <Heading as="h5" mb={2}>
          Search
        </Heading>
        <HStack alignItems="center">
          <SearchForm form={searchForm} />
          <searchForm.Subscribe selector={state => state.isSubmitting}>
            {isSubmitting => (
              <IconButton form={searchForm.formId} type="submit" loading={isSubmitting} aria-label="search">
                <FaMagnifyingGlass />
              </IconButton>
            )}
          </searchForm.Subscribe>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
