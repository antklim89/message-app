import { memo, Suspense, startTransition, use, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Center,
  ColorSwatch,
  Dialog,
  Icon,
  IconButton,
  Input,
  Portal,
  SegmentGroup,
  SimpleGrid,
  Spinner,
  Stack,
  Tabs,
  useBreakpointValue,
  useTabs,
} from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import { useDebounceValue } from '@/shared/hooks/use-debounce-value';
import { emojiGroups } from '@/shared/lib/emojis/groups';
import type { Emoji } from '@/shared/model/emoji';

const emojisPromise = import('@/shared/lib/emojis/list.json').then(m => m.default);

const skinTones = ['#FDE030', '#FFDBAC', '#F1C27D', '#E0AC69', '#C68642', '#8D5524'] as const;

export function EmojiPicker({
  onEmojiSelect,
  ...props
}: {
  onEmojiSelect: (emoji: Emoji) => void;
} & Omit<Dialog.RootProviderProps, 'children'>) {
  const tabs = useTabs({
    defaultValue: '0',
    onValueChange: () => startTransition(() => {}),
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [skinToneIndex, setSkinToneIndex] = useState(0);
  const searchTermDebounced = useDebounceValue(searchTerm, 700);

  return (
    <Dialog.RootProvider motionPreset="slide-in-bottom" placement="top" {...props}>
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop />
          <Dialog.Content w="fit-content">
            <Dialog.Header flexDirection="column" alignItems="center">
              <Tabs.RootProvider value={tabs} lazyMount unmountOnExit asChild>
                <Stack alignItems="center">
                  <Tabs.List flexWrap="wrap">
                    <Tabs.Trigger px={1} py={0} fontSize="xs" value="search">
                      <Icon size="md" as={FaMagnifyingGlass} />
                    </Tabs.Trigger>

                    {Object.entries(emojiGroups).map(([key, group]) => (
                      <Tabs.Trigger title={group.label} textTransform="uppercase" key={key} value={key}>
                        <Icon size="md" as={group.icon} />
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>

                  <Tabs.Content p={0} value="1" display="flex" justifyContent="center">
                    <SegmentGroup.Root defaultValue="0">
                      <SegmentGroup.Indicator />
                      {skinTones.map((item, index) => (
                        <Button
                          unstyled
                          key={item}
                          asChild
                          onClick={() => startTransition(() => setSkinToneIndex(index))}
                        >
                          <SegmentGroup.Item value={index.toString()} key={item}>
                            <ColorSwatch key={item} value={item} />
                            <SegmentGroup.ItemHiddenInput />
                          </SegmentGroup.Item>
                        </Button>
                      ))}
                    </SegmentGroup.Root>
                  </Tabs.Content>

                  <Tabs.Content p={0} value="search">
                    <Input mb={4} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </Tabs.Content>
                </Stack>
              </Tabs.RootProvider>
            </Dialog.Header>

            <Dialog.Body overflow="hidden">
              <Tabs.RootProvider value={tabs} lazyMount unmountOnExit>
                {Object.keys(emojiGroups).map(group => (
                  <Tabs.Content p={0} key={group} value={group}>
                    <Suspense
                      key={group}
                      fallback={
                        <Center>
                          <Spinner />
                        </Center>
                      }
                    >
                      <EmojisGrid
                        skinToneIndex={skinToneIndex}
                        group={Number.parseInt(group, 10)}
                        onEmojiSelect={onEmojiSelect}
                      />
                    </Suspense>
                  </Tabs.Content>
                ))}
                <Tabs.Content p={0} value="search">
                  {searchTerm.length >= 2 && (
                    <Suspense
                      fallback={
                        <Center>
                          <Spinner />
                        </Center>
                      }
                    >
                      <EmojisGrid
                        group={-1}
                        skinToneIndex={skinToneIndex}
                        search={searchTermDebounced}
                        onEmojiSelect={onEmojiSelect}
                      />
                    </Suspense>
                  )}
                </Tabs.Content>
              </Tabs.RootProvider>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.CloseTrigger position="static" asChild>
                <Button variant="ghost">Close</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
}

const EmojisGrid = memo(
  ({
    group,
    search,
    onEmojiSelect,
    skinToneIndex,
  }: {
    skinToneIndex: number;
    group: number;
    search?: string;
    onEmojiSelect: (emoji: Emoji) => void;
  }) => {
    const chunkSize = useBreakpointValue({ base: 4, sm: 6 }, { ssr: false }) || 4;
    const emojis = use(emojisPromise) as Emoji[];
    const parentRef = useRef(null);

    const filteredEmojis = useMemo(() => {
      return emojis.filter(i => {
        if (i.tags && group === -1 && search && search.length >= 2) {
          return i.tags.some(tags => tags.includes(search));
        }
        return i.group === group;
      });
    }, [search, group, emojis]);

    const chunkedEmojis = useMemo(() => {
      const numberOfChunks = Math.ceil(filteredEmojis.length / 5);

      return Array.from({ length: numberOfChunks }, (_, index) =>
        filteredEmojis.slice(index * chunkSize, (index + 1) * chunkSize),
      );
    }, [filteredEmojis, chunkSize]);

    const rowVirtualizer = useVirtualizer({
      count: chunkedEmojis.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 64,
      gap: 2,
    });

    return (
      <Box ref={parentRef} height="400px" overflow="auto">
        <Box w="100%" position="relative" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map(virtualItem => {
            const emojisChunk = chunkedEmojis[virtualItem.index];
            if (!emojisChunk) return null;

            return (
              <SimpleGrid
                columns={chunkSize}
                position="absolute"
                top={0}
                left={0}
                w="100%"
                key={virtualItem.index}
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {emojisChunk.map(emoji => (
                  <EmojiItem
                    onEmojiSelect={onEmojiSelect}
                    emoji={emoji}
                    skinToneIndex={skinToneIndex}
                    key={emoji.hexcode}
                  />
                ))}
              </SimpleGrid>
            );
          })}
        </Box>
      </Box>
    );
  },
);

function EmojiItem({
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
      size="2xl"
      fontSize="5xl"
      key={emojisSkinTone.hexcode}
      aria-label={emojisSkinTone.label}
    >
      {emojisSkinTone.unicode}
    </IconButton>
  );
}
