import { useEffect, useEffectEvent, useState } from 'react';
import { Button, Flex, Span } from '@chakra-ui/react';
import { signal } from '@lexical/extension';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useExtensionDependency } from '@lexical/react/useExtensionComponent';
import { useSignalValue } from '@lexical/react/useExtensionSignalValue';
import {
  $getRoot,
  COMMAND_PRIORITY_CRITICAL,
  defineExtension,
  KEY_ENTER_COMMAND,
  type SerializedEditorState,
} from 'lexical';

export const SubmitExtension = defineExtension({
  name: '@message-app/submit',
  build() {
    return { Component: SubmitButton, isSubmitting: signal(false) };
  },
});

export function SubmitButton({
  maxLength = 600,
  minLength = 1,
  onSubmit,
  disabled,
}: {
  onSubmit: (textContent: SerializedEditorState) => Promise<void>;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
}) {
  const [editor] = useLexicalComposerContext();
  const { output } = useExtensionDependency(SubmitExtension);
  const [textLength, setTextLength] = useState(maxLength);
  const isSubmitting = useSignalValue(output.isSubmitting);
  const handleSubmitEvent = useEffectEvent(handleSubmit);

  useEffect(() => {
    return editor.registerTextContentListener(() => {
      editor.getEditorState().read(() => {
        const contentLength = $getRoot().getTextContentSize();
        setTextLength(maxLength - contentLength);
      });
    });
  }, [editor, maxLength]);

  useEffect(
    () =>
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (e: KeyboardEvent | null) => {
          if (e == null) return true;
          if (e.ctrlKey && e.key === 'Enter') void handleSubmitEvent();
          return true;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    [editor],
  );

  async function handleSubmit() {
    const textSubmitLength = $getRoot().getTextContentSize();
    if (textSubmitLength > maxLength || textSubmitLength < minLength) return true;

    const textContent = editor.getEditorState().toJSON();

    output.isSubmitting.value = true;
    try {
      await onSubmit(textContent);
    } finally {
      output.isSubmitting.value = false;
    }
  }

  return (
    <Flex right="0.25rem" position="absolute" bottom="0.25rem" alignItems="center" gap="4">
      <Span>
        {textLength} / {maxLength}
      </Span>
      <Button
        disabled={disabled}
        loading={isSubmitting}
        loadingText={isSubmitting ? 'Submitting…' : 'Submit'}
        onClick={() => {
          editor.update(async () => await handleSubmit());
        }}
      >
        Submit
      </Button>
    </Flex>
  );
}
