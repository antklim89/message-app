import { Box, FileUpload, IconButton, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { formOptions, revalidateLogic } from '@tanstack/react-form';
import { FaImage, FaTrash, FaTriangleExclamation } from 'react-icons/fa6';
import type { z } from 'zod/v4-mini';

import { ProfileSelectLexicalPlugin } from '@/entities/profiles';
import { withForm } from '@/shared/lib/react-form';
import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MAX_MESSAGE_BODY_LENGTH } from '../config/constants';
import { useMessageFilesUpload } from '../lib/useMessageFilesUpload';
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
    const fileUpload = useMessageFilesUpload({
      onFileAccept(files) {
        form.setFieldValue('files', files);
      },
    });

    return (
      <FileUpload.RootProvider value={fileUpload}>
        <FileUpload.HiddenInput />
        <form.AppForm>
          {fileUpload.acceptedFiles.length > 0 && (
            <SimpleGrid columns={4} gap={1}>
              {fileUpload.acceptedFiles.map(acceptedFile => (
                <Box key={acceptedFile.name} position="relative" h={32}>
                  <IconButton
                    size="xs"
                    colorPalette="red"
                    aria-label="Delete uploaded image"
                    position="absolute"
                    top={2}
                    right={2}
                    onClick={() => fileUpload.deleteFile(acceptedFile)}
                  >
                    <FaTrash />
                  </IconButton>
                  <Image
                    src={URL.createObjectURL(acceptedFile)}
                    alt="Uploaded file"
                    w="full"
                    aspectRatio="wide"
                    mb={2}
                    h={32}
                    borderRadius="md"
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}

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
                <form.AppField name="files">
                  {() => (
                    <FileUpload.Trigger asChild>
                      <IconButton>
                        <FaImage />
                      </IconButton>
                    </FileUpload.Trigger>
                  )}
                </form.AppField>

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
      </FileUpload.RootProvider>
    );
  },
});
