import { type RefObject, useCallback, useMemo } from 'react';
import { Button, Popover, Portal } from '@chakra-ui/react';
import { signal } from '@lexical/extension';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { ReactExtension } from '@lexical/react/ReactExtension';
import { useExtensionDependency } from '@lexical/react/useExtensionComponent';
import { useSignalValue } from '@lexical/react/useExtensionSignalValue';
import { useDebounceCallback } from '@message-app/ui/hooks/use-debounce-callback.js';
import { $getSelection, $isRangeSelection, configExtension, defineExtension, safeCast, type TextNode } from 'lexical';

import { $createUserNode, registerUpdateUserCommand, UserNode } from '../model/nodes/user-node';

export interface RichTextUserPluginOption {
  id: string;
  name: string;
  displayname: string;
}

class UserOption extends MenuOption {
  id: string;
  name: string;
  displayname: string;

  constructor(user: RichTextUserPluginOption) {
    super(user.id);
    this.id = user.id;
    this.name = user.name;
    this.displayname = user.displayname;
  }
}

function UserSelect() {
  const [editor] = useLexicalComposerContext();
  const { output, config } = useExtensionDependency(UserSelectExtension);
  const options = useSignalValue(output.options);

  const triggerFn = useBasicTypeaheadTriggerMatch('@', { minLength: 1 });

  const userOptions = useMemo(() => options.map(result => new UserOption(result)), [options]);

  const handleSelectOption = useCallback(
    (selectedOption: UserOption | null, nodeToReplace: TextNode | null, closeMenu: () => void) => {
      editor.update(() => {
        const selection = $getSelection();
        if (!($isRangeSelection(selection) && selectedOption && nodeToReplace)) return closeMenu();

        const userNode = $createUserNode(selectedOption);
        nodeToReplace.replace(userNode);
        userNode.selectEnd();
        closeMenu();
      });
    },
    [editor],
  );

  async function handleQueryChange(queryString: string | null): Promise<void> {
    const newOptions = await config.onQuerySearchChange(queryString);
    output.options.value = newOptions;
  }

  const handleQueryChangeDebounced = useDebounceCallback(handleQueryChange, 700);

  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={handleQueryChangeDebounced}
      onSelectOption={handleSelectOption}
      triggerFn={triggerFn}
      options={userOptions}
      menuRenderFn={(ref, { options: o, selectedIndex, setHighlightedIndex, selectOptionAndCleanUp }) => (
        <UserSelectPopover
          ref={ref}
          options={o}
          selectedIndex={selectedIndex}
          setHighlightedIndex={setHighlightedIndex}
          selectOptionAndCleanUp={selectOptionAndCleanUp}
        />
      )}
    />
  );
}

function UserSelectPopover({
  options,
  ref,
  selectOptionAndCleanUp,
  selectedIndex,
  setHighlightedIndex,
}: {
  ref: RefObject<HTMLElement | null>;
  options: UserOption[];
  selectedIndex: number | null;
  setHighlightedIndex: (index: number) => void;
  selectOptionAndCleanUp: (option: UserOption) => void;
}) {
  return (
    <Popover.Root
      autoFocus={false}
      open
      positioning={{
        placement: 'bottom-start',
        offset: { mainAxis: -12 },
        getAnchorElement: () => ref.current,
      }}
    >
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="full">
            {options.map((option, index) => (
              <Button
                variant="ghost"
                bg={selectedIndex === index ? 'bg.muted' : undefined}
                key={option.key}
                tabIndex={-1}
                ref={option.setRefElement}
                role="option"
                aria-selected={selectedIndex === index}
                id={`typeahead-item-${index}`}
                onMouseEnter={() => {
                  setHighlightedIndex(index);
                }}
                onClick={() => {
                  setHighlightedIndex(index);
                  selectOptionAndCleanUp(option);
                }}
              >
                {option.displayname}@{option.name}
              </Button>
            ))}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}

export const UserSelectExtension = defineExtension({
  name: '@message-app/user-select',
  config: safeCast<{
    options: RichTextUserPluginOption[];
    onQuerySearchChange: (queryString: string | null) => Promise<RichTextUserPluginOption[]>;
  }>({
    options: [],
    onQuerySearchChange: () => Promise.resolve<RichTextUserPluginOption[]>([]),
  }),
  build: (_editor, { options }) => ({ options: signal(options), queryString: signal('') }),
  dependencies: [configExtension(ReactExtension, { decorators: [<UserSelect />] })],
  register(editor) {
    return registerUpdateUserCommand(editor);
  },
  nodes: () => [UserNode],
});
