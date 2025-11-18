import { SegmentGroup, Text } from '@chakra-ui/react';
import { formOptions, revalidateLogic } from '@tanstack/react-form';
import type { z } from 'zod/v4-mini';

import { withForm } from '@/shared/lib/react-form';
import { categories } from '../config/categories';
import { ReportCreateSchema } from '../model/schemas';

export const reportCreateFormOptions = formOptions({
  validators: {
    onSubmit: ReportCreateSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: { body: '', category: categories[0].label } as z.infer<typeof ReportCreateSchema>,
});

export const ReportCreateForm = withForm({
  ...reportCreateFormOptions,
  render: ({ form }) => {
    return (
      <form.AppForm>
        <form.Form>
          <form.AppField name="category">
            {field => (
              <SegmentGroup.Root
                value={field.state.value}
                onValueChange={v => v.value && field.handleChange(v.value)}
                orientation="vertical"
                w="full"
              >
                <SegmentGroup.Indicator />
                {categories.map(item => (
                  <SegmentGroup.Item
                    value={item.label}
                    key={item.label}
                    justifyContent="flex-start"
                    h="fit-content"
                    py={4}
                  >
                    <SegmentGroup.ItemText textAlign="start" textTransform="capitalize" fontSize="lg">
                      <Text as="span" textTransform="capitalize" fontSize="lg">
                        {item.label}
                      </Text>
                      <br />
                      <Text as="span" fontSize="ms" opacity={0.5}>
                        {item.description}
                      </Text>
                    </SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                ))}
              </SegmentGroup.Root>
            )}
          </form.AppField>
          <form.AppField name="body">{field => <field.TextareaField placeholder="Report details..." />}</form.AppField>
        </form.Form>
      </form.AppForm>
    );
  },
});
