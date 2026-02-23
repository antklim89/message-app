import { useRef } from 'react';
import { Field, Image, Input, Tabs, Text, type UseFileUploadReturn } from '@chakra-ui/react';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { formOptions, revalidateLogic } from '@tanstack/react-form';
import { FaImage, FaLink, FaTriangleExclamation, FaVideo } from 'react-icons/fa6';
import type { z } from 'zod/v4-mini';

import { ProfileSelectLexicalPlugin } from '@/entities/profiles';
import { withForm } from '@/shared/lib/react-form';
import { MessageEmbeddedType } from '@/shared/model/message-embedded-type';
import { EmbeddedSite } from '@/shared/ui/embedded-site';
import { RichTextEditor } from '@/shared/ui/rich-text-editor';
import { MessageCreateTabTrigger } from './message-create-tab-trigger';
import { MessageUploadSection } from './message-upload-section';
import {
  MAX_MESSAGE_BODY_LENGTH,
  MAX_UPLOADED_IMAGES,
  MAX_UPLOADED_VIDEOS,
  MAX_VIDEO_SIZE_IN_BYTES,
} from '../config/constants';
import { MessageCreateSchema } from '../model/schemas';

export const messageEditFormOptions = formOptions({
  validators: {
    onDynamic: MessageCreateSchema,
  },
  validationLogic: revalidateLogic(),
  defaultValues: {} as z.infer<typeof MessageCreateSchema>,
});

export const MessageEditForm = withForm({
  ...messageEditFormOptions,
  props: {} as { imagesUpload: UseFileUploadReturn; videoUpload: UseFileUploadReturn },
  render: ({ form, imagesUpload, videoUpload }) => {
    const linkInputRef = useRef<HTMLInputElement>(null);

    return (
      <Tabs.Root
        lazyMount={true}
        onValueChange={({ value }) => {
          const type = value === 'null' ? undefined : value;
          form.setFieldValue('embeddedType', type as MessageEmbeddedType);
        }}
      >
        <form.AppForm>
          <Tabs.ContentGroup mb={8}>
            <Tabs.Content value={MessageEmbeddedType.IMAGES}>
              <MessageUploadSection
                render={file => <Image src={URL.createObjectURL(file)} w="full" h="full" objectFit="cover" />}
                fileIcon={<FaImage />}
                maxUploadedFiles={MAX_UPLOADED_IMAGES}
                upload={imagesUpload}
                uploadMessage=""
              />
            </Tabs.Content>
            <Tabs.Content value={MessageEmbeddedType.VIDEOS}>
              <MessageUploadSection
                render={file => <video width="100%" src={URL.createObjectURL(file)} controls />}
                fileIcon={<FaVideo />}
                maxUploadedFiles={MAX_UPLOADED_VIDEOS}
                upload={videoUpload}
                uploadMessage={`Upload video lower than ${MAX_VIDEO_SIZE_IN_BYTES / 1024 / 1024} MB.`}
              />
            </Tabs.Content>
            <Tabs.Content value={MessageEmbeddedType.LINK}>
              <form.AppField name="embeddedLink">
                {field => (
                  <Field.Root invalid={!field.state.meta.isValid}>
                    <Field.Label>External link</Field.Label>
                    <Input
                      ref={linkInputRef}
                      defaultValue="https://"
                      placeholder="https://example.com"
                      onChange={e => {
                        field.handleChange(e.target.value);
                      }}
                    />
                    <Field.ErrorText>{field.state.meta.errors.map(err => err?.message)}</Field.ErrorText>
                    {field.state.meta.isValid && <EmbeddedSite url={field.state.value} />}
                  </Field.Root>
                )}
              </form.AppField>
            </Tabs.Content>
          </Tabs.ContentGroup>

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

                <form.AppField name="embeddedType">
                  {({ state: { value } }) => (
                    <>
                      <MessageCreateTabTrigger
                        embeddedType={MessageEmbeddedType.IMAGES}
                        value={value}
                        icon={<FaImage />}
                      />
                      <MessageCreateTabTrigger
                        embeddedType={MessageEmbeddedType.VIDEOS}
                        value={value}
                        icon={<FaVideo />}
                      />
                      <MessageCreateTabTrigger
                        embeddedType={MessageEmbeddedType.LINK}
                        value={value}
                        icon={<FaLink />}
                      />
                    </>
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
      </Tabs.Root>
    );
  },
});
