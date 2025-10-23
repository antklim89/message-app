import { type KeyboardEvent, useEffect, useState } from 'react';
import { Button, HStack, IconButton, Popover, Stack, useDisclosure } from '@chakra-ui/react';
import { $createLinkNode, $isLinkNode, type LinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { formOptions, revalidateLogic } from '@tanstack/react-form';
import { $createTextNode, $getSelection, $isRangeSelection, $isTextNode } from 'lexical';
import { FaLink } from 'react-icons/fa6';
import { z } from 'zod/v4-mini';

import { useAppForm } from '@/shared/lib/react-form';
import { checkLink } from '@/shared/model/schema-checks';

const LinkSchema = z.object({
  url: z.union([z.string().check(checkLink)]),
  name: z.string().check(z.maxLength(100, 'Link name is too long.')),
});

const linkFormOptions = formOptions({
  defaultValues: { url: '', name: '' },
  validators: {
    onDynamic: LinkSchema,
  },
  validationLogic: revalidateLogic(),
});

export function LexicalLinkPlugin() {
  const [editor] = useLexicalComposerContext();
  const disclosure = useDisclosure();
  const [selectedLinkNode, setSelectedLinkNode] = useState<LinkNode | null>(null);

  const linkForm = useAppForm({
    ...linkFormOptions,
    onSubmit({ value }) {
      editor.update(
        () => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;

          const newLinkNode = $createLinkNode(value.url, {
            target: '_blank',
            rel: 'noopener noreferrer',
          });
          const newTextNode = $createTextNode(value.name || value.url);
          newLinkNode.append(newTextNode);

          if (selectedLinkNode) {
            selectedLinkNode.replace(newLinkNode);
            return newTextNode.selectEnd();
          }

          selection.insertNodes([newLinkNode]);
        },
        {
          onUpdate() {
            setTimeout(disclosure.onClose, 10);
          },
        },
      );
    },
  });

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      linkForm.handleSubmit();
    }
  }

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        const selectedNode = selection.getNodes()[0];
        const selectedNodeParent = selection.getNodes()[0]?.getParent();

        if (selection.isCollapsed() && $isTextNode(selectedNode) && $isLinkNode(selectedNodeParent)) {
          const textContent = selectedNode.getTextContent();
          const newLinkUrl = selectedNodeParent.getURL();

          linkForm.setFieldValue('name', textContent);
          linkForm.setFieldValue('url', newLinkUrl);
          return setSelectedLinkNode(selectedNodeParent);
        }

        if (!selection.isCollapsed() && $isTextNode(selectedNode)) {
          const textContent = selection.getTextContent();
          return linkForm.setFieldValue('name', textContent);
        }

        linkForm.setFieldValue('name', '');
        linkForm.setFieldValue('url', '');
        setSelectedLinkNode(null);
      });
    });
  }, [editor, linkForm]);

  function handleLinkRemove() {
    editor.update(() => {
      if (!selectedLinkNode) return;
      const newTextContent = selectedLinkNode
        .getChildren()
        .map(i => i.getTextContent())
        .join('');
      const newTextNode = $createTextNode(newTextContent);
      selectedLinkNode.replace(newTextNode);
      newTextNode.selectEnd();
      disclosure.onClose();
    });
  }

  return (
    <Popover.Root
      modal
      positioning={{ placement: 'bottom-end', strategy: 'fixed' }}
      onExitComplete={() => {
        linkForm.reset();
        editor.focus(undefined, { defaultSelection: undefined });
      }}
      open={disclosure.open}
      onOpenChange={e => disclosure.setOpen(e.open)}
    >
      <Popover.Trigger asChild>
        <IconButton onClick={disclosure.onOpen}>
          <FaLink />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content asChild>
          <HStack p={2}>
            <linkForm.AppForm>
              <Stack w="full">
                <linkForm.AppField name="name">
                  {field => <field.InputField onKeyDown={handleKeyDown} placeholder="Link name..." />}
                </linkForm.AppField>
                <linkForm.AppField name="url">
                  {field => <field.InputField onKeyDown={handleKeyDown} placeholder="https://www.example.com" />}
                </linkForm.AppField>
              </Stack>
            </linkForm.AppForm>
            <Stack>
              <Button form={linkForm.formId} onClick={linkForm.handleSubmit}>
                Paste
              </Button>
              {selectedLinkNode && (
                <Button colorPalette="red" onClick={handleLinkRemove}>
                  Remove
                </Button>
              )}
              <Button onClick={disclosure.onClose} variant="ghost">
                Close
              </Button>
            </Stack>
          </HStack>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
