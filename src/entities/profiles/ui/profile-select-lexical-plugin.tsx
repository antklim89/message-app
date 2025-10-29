import { useCallback, useMemo, useState } from 'react';
import { Button, Popover } from '@chakra-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { useQuery } from '@tanstack/react-query';
import { $getSelection, $isRangeSelection, type TextNode } from 'lexical';

import { $createUserNode } from '@/shared/lib/lexical';
import { getProfileListQueryOptions } from '../api/queries/use-profile-list-query';
import type { ProfileListItemType } from '../models/types';

class ProfileOption extends MenuOption {
  id: string;
  username: string;
  displayname: string;

  constructor(profile: ProfileListItemType) {
    super(profile.username);
    this.id = profile.id;
    this.username = profile.username;
    this.displayname = profile.displayname;
  }
}

export function ProfileSelectLexicalPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>('');
  const profileListQuery = useQuery({
    ...getProfileListQueryOptions({ search: queryString ?? '' }),
    enabled: queryString != null && queryString.length > 0,
  });

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('@', {
    minLength: 1,
  });

  const options = useMemo(
    () => (profileListQuery.data != null ? profileListQuery.data.map(profile => new ProfileOption(profile)) : []),
    [profileListQuery.data],
  );

  const onSelectOption = useCallback(
    (selectedOption: ProfileOption, nodeToRemove: TextNode | null, closeMenu: () => void) => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || selectedOption == null) return;
        if (nodeToRemove) nodeToRemove.remove();
        const newUserNode = $createUserNode({ id: selectedOption.id, username: selectedOption.username });
        selection.insertNodes([newUserNode]);

        closeMenu();
      });
    },
    [editor],
  );

  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={(anchorElementRef, { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }) => {
        return (
          <Popover.Root
            open
            positioning={{
              placement: 'right-start',
              getAnchorRect: () => anchorElementRef.current?.getBoundingClientRect() || null,
            }}
          >
            <Popover.Positioner>
              <Popover.Content>
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
                    {option.displayname}@{option.username}
                  </Button>
                ))}
              </Popover.Content>
            </Popover.Positioner>
          </Popover.Root>
        );
      }}
    />
  );
}
