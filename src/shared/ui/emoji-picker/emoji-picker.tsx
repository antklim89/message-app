import { type ReactNode, startTransition, use, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  ColorSwatch,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  SegmentGroup,
  SimpleGrid,
  Stack,
  Tabs,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FaX } from 'react-icons/fa6';

import { useDebounceValue } from '@/shared/hooks/use-debounce-value';
import type { Emoji } from '@/shared/model/emoji';
import { emojiIconsMap } from './emoji-icons-map';

const emojisPromise = import('./emoji-list.json').then(m => m.default);

const skinTones = ['#FDE030', '#FFDBAC', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'] as const;

export function EmojiPicker({ onEmojiSelect }: { onEmojiSelect: (emoji: Emoji) => void }) {
  const emojiGroups = use(emojisPromise);
  const [searchTerm, setSearchTerm] = useState('');
  const [skinToneIndex, setSkinToneIndex] = useState(0);
  const searchTermDebounced = useDebounceValue(searchTerm, 700);

  const filteredEmojis = useMemo(
    () =>
      emojiGroups.map(emojiGroup => ({
        ...emojiGroup,
        items: emojiGroup.items.filter(i => {
          if (searchTermDebounced.length >= 2) return i.tags.some(tags => tags.includes(searchTermDebounced));
          return true;
        }),
      })),
    [searchTermDebounced, emojiGroups],
  );

  return (
    <Tabs.Root
      orientation="vertical"
      onValueChange={() => startTransition(() => undefined)}
      defaultValue={emojiGroups[0]?.label}
      lazyMount
      asChild
    >
      <HStack gap={2} alignItems="sta">
        <Stack flexGrow={1} w="full" gap={4}>
          <InputGroup
            endAddon={
              <IconButton variant="ghost" colorPalette="red" size="2xs" onClick={() => setSearchTerm('')}>
                <FaX />
              </IconButton>
            }
          >
            <Input size="2xs" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </InputGroup>

          <Tabs.Content value="people body" unstyled w="full">
            <SegmentGroup.Root defaultValue="0" size="xs" w="full">
              <SegmentGroup.Indicator />
              {skinTones.map((skinTone, index) => (
                <Button unstyled key={skinTone} asChild onClick={() => startTransition(() => setSkinToneIndex(index))}>
                  <SegmentGroup.Item w="full" value={index.toString()} key={skinTone}>
                    <ColorSwatch key={skinTone} value={skinTone} h="full" w="full" />
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                </Button>
              ))}
            </SegmentGroup.Root>
          </Tabs.Content>

          <Box>
            {filteredEmojis.map(emojiGroup => (
              <Tabs.Content key={emojiGroup.key} p={0} value={emojiGroup.label}>
                <EmojiPickerGrid emojis={emojiGroup.items}>
                  {emoji => (
                    <EmojiPickerItem
                      key={emoji.label}
                      emoji={emoji}
                      skinToneIndex={skinToneIndex}
                      onEmojiSelect={onEmojiSelect}
                    />
                  )}
                </EmojiPickerGrid>
              </Tabs.Content>
            ))}
          </Box>
        </Stack>
        <Tabs.List flexGrow={0} alignItems="center">
          {filteredEmojis.map(group => (
            <Tabs.Trigger
              disabled={group.items.length === 0}
              opacity={group.items.length === 0 ? 0.1 : 1}
              title={group.label}
              minW={0}
              h="1.5rem"
              fontSize="xs"
              key={group.label}
              value={group.label}
            >
              <Icon size="sm" as={emojiIconsMap[group.label]} />
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </HStack>
    </Tabs.Root>
  );
}

function EmojiPickerGrid({ emojis, children }: { emojis: Emoji[]; children: (emoji: Emoji) => ReactNode }) {
  const columns = useBreakpointValue({ base: 6, sm: 8 }, { ssr: false }) || 6;
  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(emojis.length / columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 26,
    gap: 2,
    overscan: 5,
  });

  return (
    <Box ref={parentRef} height="14rem" overflow="auto">
      <Box w="full" position="relative" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
        {rowVirtualizer.getVirtualItems().map(virtualItem => {
          const emojiChunk = emojis.slice(virtualItem.index * columns, virtualItem.index * columns + columns);

          return (
            <SimpleGrid
              columns={columns}
              position="absolute"
              top={0}
              left={0}
              w="full"
              key={virtualItem.index}
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {emojiChunk.map(children)}
            </SimpleGrid>
          );
        })}
      </Box>
    </Box>
  );
}

function EmojiPickerItem({
  emoji,
  skinToneIndex,
  onEmojiSelect,
}: {
  emoji: Emoji;
  skinToneIndex: number;
  onEmojiSelect: (emoji: Emoji) => void;
}) {
  const emojisSkinTone = emoji.skins && skinToneIndex > 0 ? (emoji.skins[skinToneIndex - 1] ?? emoji) : emoji;

  function handleEmojiSelect() {
    onEmojiSelect(emojisSkinTone);
  }

  return (
    <IconButton
      title={emojisSkinTone.label}
      onClick={handleEmojiSelect}
      variant="ghost"
      size="2xs"
      fontSize={{ base: 'xl', sm: '2xl' }}
      key={emojisSkinTone.hexcode}
      aria-label={emojisSkinTone.label}
    >
      {emojisSkinTone.unicode}
    </IconButton>
  );
}
