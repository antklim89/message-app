import { Badge, IconButton, Text, useDialog } from '@chakra-ui/react';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { formOptions, revalidateLogic } from '@tanstack/react-form';
import { FaImage, FaTriangleExclamation } from 'react-icons/fa6';
import type { z } from 'zod/v4-mini';

import { ProfileSelectLexicalPlugin } from '@/entities/profiles';
import { withForm } from '@/shared/lib/react-form';
import { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import { Dialog } from '@/shared/ui/dialog';
import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MessageEditImageDialog } from './message-edit-image-dialog';
import { MAX_MESSAGE_BODY_LENGTH } from '../config/constants';
import { MessageCreateSchema } from '../model/schemas';

export const messageEditFormOptions = formOptions({
  validators: {
    onSubmit: MessageCreateSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: {
    body: undefined,
    embeddedItems: [],
    embeddedType: undefined,
  } as z.infer<typeof MessageCreateSchema>,
});

export const MessageEditForm = withForm({
  ...messageEditFormOptions,
  render: ({ form }) => {
    const dialog = useDialog();

    return (
      <form.AppForm>
        <form.AppField name="embeddedItems">
          {field => (
            <MessageEditImageDialog
              dialog={dialog}
              selectedImages={field.state.value ?? []}
              onChange={v => {
                field.handleChange(v);
                v.length > 0
                  ? field.form.setFieldValue('embeddedType', MessageEmbeddedType.IMAGES)
                  : field.form.setFieldValue('embeddedType', undefined);
              }}
            />
          )}
        </form.AppField>
        <RichTextEditor
          onKeyDown={e => {
            if (!e) return;
            if (e.key !== 'Enter' || !e.ctrlKey) return;
            e.preventDefault();
            form.handleSubmit();
          }}
          value={form.getFieldValue('body')}
          maxLength={MAX_MESSAGE_BODY_LENGTH}
          plugins={
            <>
              <ProfileSelectLexicalPlugin />
              <Dialog.Trigger dialog={dialog} asChild>
                <IconButton position="relative">
                  <FaImage />

                  <form.AppField name="embeddedItems">
                    {field =>
                      field.state.value &&
                      field.state.value.length > 0 && (
                        <Badge as="span" variant="subtle" colorPalette="red" position="absolute" top={-2} right={-2}>
                          {field.state.value.length}
                        </Badge>
                      )
                    }
                  </form.AppField>
                </IconButton>
              </Dialog.Trigger>

              <form.AppField name="body">
                {field => (
                  <>
                    <OnChangePlugin onChange={e => field.handleChange(e.toJSON().root)} />
                    {!field.state.meta.isValid && (
                      <Text as="span" color="red.500" display="flex" alignItems="baseline" gap={1}>
                        <FaTriangleExclamation />
                        {field.state.meta.errors.map(err => err?.message ?? err).join(',')}
                      </Text>
                    )}
                  </>
                )}
              </form.AppField>
            </>
          }
        />
      </form.AppForm>
    );
  },
});
