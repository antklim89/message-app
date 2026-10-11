import { lazy, type ReactNode, Suspense } from 'react';
import { Card, Collapsible, IconButton, type IconButtonProps, Spinner, useCollapsibleContext } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection } from 'lexical';
import { FaFaceSmile } from 'react-icons/fa6';

const EmojiPicker = lazy(() =>
  import('@message-app/ui/components/emoji-picker/emoji-picker.js').then(m => ({ default: m.EmojiPicker })),
);

export function RichTextEmojiTriggerPlugin(props: IconButtonProps) {
  const collapsible = useCollapsibleContext();
  return (
    <Collapsible.Trigger asChild>
      <IconButton {...props} variant={collapsible.open ? 'solid' : 'ghost'}>
        <FaFaceSmile />
      </IconButton>
    </Collapsible.Trigger>
  );
}

export function RichTextEmojiProviderPlugin({ children }: { children: ReactNode }) {
  return <Collapsible.Root lazyMount>{children}</Collapsible.Root>;
}

export function RichTextEmojiPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <Collapsible.Content>
      <Suspense
        fallback={
          <Card.Root border="none" h="290px" display="flex" justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </Card.Root>
        }
      >
        <EmojiPicker
          onEmojiSelect={emoji => {
            editor.update(() => {
              const selection = $getSelection();
              if (selection) selection.insertText(emoji.unicode);
            });
          }}
        />
      </Suspense>
    </Collapsible.Content>
  );
}
