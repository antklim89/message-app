import { Text } from '@chakra-ui/react';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { formOptions, revalidateLogic } from '@tanstack/react-form';
import { FaTriangleExclamation } from 'react-icons/fa6';
import type { z } from 'zod/v4-mini';

import { ProfileSelectLexicalPlugin } from '@/entities/profiles';
import { withForm } from '@/shared/lib/react-form';
import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MessageImageUploadButton } from './message-image-upload-button';
import { MessageUploadedImages } from './message-uploaded-images';
import { MAX_MESSAGE_BODY_LENGTH } from '../config/constants';
import { useMessageImagesUpload } from '../lib/hooks/use-message-images-upload';
import { MessageCreateSchema } from '../model/schemas';

export const messageEditFormOptions = formOptions({
  validators: {
    onSubmit: MessageCreateSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: {} as z.infer<typeof MessageCreateSchema>,
});

export const MessageEditForm = withForm({
  ...messageEditFormOptions,
  render: ({ form }) => {
    const upload = useMessageImagesUpload({
      onUpload(files) {
        form.setFieldValue('embedded', { type: 'images', images: files });
      },
    });

    return (
      <form.AppForm>
        <MessageUploadedImages upload={upload} />
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
              <MessageImageUploadButton upload={upload} />

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
