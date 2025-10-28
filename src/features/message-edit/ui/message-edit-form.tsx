import { Text } from '@chakra-ui/react';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { formOptions, revalidateLogic } from '@tanstack/react-form';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { z } from 'zod/v4-mini';

import type { MessageBody } from '@/entities/messages';
import { ProfileSelectLexicalPlugin } from '@/entities/profiles';
import { calculateLexicalTextLength } from '@/shared/lib/lexical';
import { withForm } from '@/shared/lib/react-form';
import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MAX_MESSAGE_BODY_LENGTH, MIN_MESSAGE_BODY_LENGTH } from '../config/constants';

export const messageEditFormOptions = formOptions({
  validators: {
    onSubmit: z.object({
      body: z.custom<MessageBody>().check(
        z.refine(v => {
          const textLength = calculateLexicalTextLength(v);
          return textLength <= MAX_MESSAGE_BODY_LENGTH && textLength > MIN_MESSAGE_BODY_LENGTH;
        }, `The text should be between ${MIN_MESSAGE_BODY_LENGTH} and ${MAX_MESSAGE_BODY_LENGTH} characters long.`),
      ),
    }),
  },

  validationLogic: revalidateLogic(),
  defaultValues: {} as { body: MessageBody },
});

export const MessageEditForm = withForm({
  ...messageEditFormOptions,
  render: ({ form }) => {
    return (
      <form.AppForm>
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
              <form.AppField name="body">
                {field => (
                  <>
                    <OnChangePlugin onChange={e => field.handleChange(e.toJSON().root)} />
                    {!field.state.meta.isValid && (
                      <Text as="span" color="red.500" display="flex" alignItems="baseline" gap={1}>
                        <FaTriangleExclamation /> {field.state.meta.errors.map(err => err?.message ?? err).join(',')}
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
