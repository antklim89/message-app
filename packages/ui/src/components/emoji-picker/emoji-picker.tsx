import {
  Activity,
  type ChangeEvent,
  type ReactNode,
  Suspense,
  startTransition,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  Box,
  Button,
  Card,
  Center,
  CloseButton,
  ColorSwatch,
  EmptyState,
  Group,
  HStack,
  IconButton,
  Input,
  InputGroup,
  SegmentGroup,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  FaBicycle,
  FaBook,
  FaCat,
  FaCircleExclamation,
  FaEarthAfrica,
  FaExclamation,
  FaFaceSmile,
  FaFlag,
  FaHashtag,
  FaHotdog,
  FaPerson,
  FaSquare,
} from 'react-icons/fa6';

import emojis from './emoji-list.json' with { type: 'json' };

interface EmojiSkin {
  hexcode: string;
  label: string;
  unicode: string;
}

interface EmojiItem {
  hexcode: string;
  label: string;
  tags: string[];
  unicode: string;
  emoticon?: string[] | string;
  skins?: EmojiSkin[];
}

type SelectedEmoji = Pick<EmojiItem, 'label' | 'unicode' | 'hexcode'>;

const emojiIconsMap = {
  'smileys emotion': <FaFaceSmile />,
  'people body': <FaPerson />,
  component: <FaSquare />,
  'animals nature': <FaCat />,
  'food drink': <FaHotdog />,
  world: <FaEarthAfrica />,
  activities: <FaBicycle />,
  objects: <FaBook />,
  symbols: <FaHashtag />,
  flags: <FaFlag />,
} as Record<string, ReactNode>;

const skinTones = [
  [-1, '#FDE030'],
  [0, '#FFDBAC'],
  [1, '#F1C27D'],
  [2, '#E0AC69'],
  [3, '#C68642'],
  [4, '#8D5524'],
] as const;

export function EmojiPicker({ onEmojiSelect }: { onEmojiSelect: (emoji: SelectedEmoji) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [skinToneIndex, setSkinToneIndex] = useState<number>(0);
  const [searching, startSearchingTransition] = useTransition();

  const onEmojiSelectEvent = useEffectEvent(onEmojiSelect);

  return (
    <Card.Root variant="outline" border="none">
      <Card.Header p={1} flexDirection="row" css={{ '& > *': { flex: '1 0 220px' } }} flexWrap="wrap">
        <EmojiPickerSearchInput
          debouncedValue={searchQuery}
          onDebouncedChange={value => startSearchingTransition(() => setSearchQuery(value))}
        />
        <EmojiPickerSkinColorSelect onChange={v => startTransition(() => setSkinToneIndex(v))} />
      </Card.Header>
      <Card.Body p={1}>
        <HStack height="240px" justify="center" alignItems="center">
          <Suspense fallback={<Spinner size="xl" />}>
            {searching ? <Spinner size="xl" /> : null}
            <Activity mode={searching ? 'hidden' : 'visible'}>
              <Stack w="full" height="240px" overflowY="scroll" gap={4}>
                <EmojiPickerGroups
                  onEmojiSelect={onEmojiSelectEvent}
                  skinToneIndex={skinToneIndex}
                  searchQuery={searchQuery}
                />
              </Stack>
              <EmojiPickerGroupSelect />
            </Activity>
          </Suspense>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}

function EmojiPickerSkinColorSelect({ onChange }: { onChange(value: number): void }) {
  return (
    <SegmentGroup.Root defaultValue="-1" w="full" size="xs">
      <SegmentGroup.Indicator />
      {skinTones.map(([index, skinTone]) => (
        <Button unstyled key={skinTone} asChild onClick={() => onChange(index)} size="xs" p={1}>
          <SegmentGroup.Item w="full" h="full" value={index.toString()} key={skinTone}>
            <ColorSwatch key={skinTone} value={skinTone} h="5" w="5" />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        </Button>
      ))}
    </SegmentGroup.Root>
  );
}

function EmojiPickerGroupSelect() {
  return (
    <Group grow attached orientation="vertical" h="100%">
      {emojis.map(({ label }) => (
        <Button
          variant="ghost"
          color="fg"
          key={label}
          onClick={() => {
            const element = document.querySelector(`#emoji-${label.replaceAll(' ', '-')}`);
            element?.scrollIntoView();
          }}
        >
          {emojiIconsMap[label as keyof typeof emojiIconsMap] || <FaExclamation />}
        </Button>
      ))}
    </Group>
  );
}

function EmojiPickerGroups({
  searchQuery,
  skinToneIndex,
  onEmojiSelect,
}: {
  searchQuery: string;
  skinToneIndex: number;
  onEmojiSelect: (emoji: SelectedEmoji) => void;
}) {
  const filteredEmojis = useMemo(() => {
    if (searchQuery.length <= 1) return emojis;
    return emojis.map(emoji => ({
      ...emoji,
      items: emoji.items.filter(item => {
        const regExp = new RegExp(searchQuery, 'i');

        return regExp.test(item.label) || item.tags.some(tag => new RegExp(searchQuery, 'i').test(tag));
      }),
    }));
  }, [emojis, searchQuery]);

  if (filteredEmojis.every(i => i.items.length === 0)) return <EmojiPickerEmpty searchQuery={searchQuery} />;
  return filteredEmojis.map(({ items, label }) =>
    items.length === 0 ? null : (
      <Stack key={label}>
        <Box>
          <Text id={`emoji-${label.replaceAll(' ', '-')}`} as="h3" textTransform="uppercase" fontWeight="bold">
            {label}
          </Text>
        </Box>

        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {items.map(item => (
            <EmojiPickerItem
              onEmojiSelect={onEmojiSelect}
              item={item}
              key={item.hexcode}
              skinToneIndex={skinToneIndex}
            />
          ))}
        </Box>
      </Stack>
    ),
  );
}

function EmojiPickerItem({
  item,
  skinToneIndex,
  onEmojiSelect,
}: {
  skinToneIndex: number;
  item: EmojiItem;
  onEmojiSelect: (emoji: SelectedEmoji) => void;
}) {
  const emojisSkinTone = useMemo(() => item.skins?.[skinToneIndex] ?? item, [item, skinToneIndex]);

  return useMemo(
    () => (
      <IconButton
        title={item.label}
        size="xl"
        variant="ghost"
        aspectRatio="square"
        fontSize="4xl"
        onClick={() => onEmojiSelect(emojisSkinTone)}
      >
        {emojisSkinTone.unicode}
      </IconButton>
    ),
    [emojisSkinTone, item.label, onEmojiSelect],
  );
}

function EmojiPickerSearchInput({
  debouncedValue,
  onDebouncedChange,
}: {
  debouncedValue: string;
  onDebouncedChange: (value: string) => void;
}) {
  const [inputState, setInputState] = useState(debouncedValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const onDebouncedChangeEvent = useEffectEvent(onDebouncedChange);

  useEffect(() => {
    const timer = setTimeout(() => onDebouncedChangeEvent(inputState), 200);

    return () => clearTimeout(timer);
  }, [inputState]);

  function handleClear() {
    setInputState('');
    inputRef.current?.focus();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setInputState(e.target.value);
  }

  return (
    <InputGroup
      endElement={inputState.length > 0 && <CloseButton size="xs" variant="ghost" me="-3" onClick={handleClear} />}
    >
      <Input size="xs" ref={inputRef} value={inputState} onChange={handleChange} placeholder="Search emoji..." />
    </InputGroup>
  );
}

function EmojiPickerEmpty({ searchQuery }: { searchQuery: string }) {
  return (
    <Center h="full">
      <EmptyState.Root textAlign="center">
        <EmptyState.Indicator>
          <FaCircleExclamation />
        </EmptyState.Indicator>
        <EmptyState.Title>Not Found</EmptyState.Title>
        <EmptyState.Description>Emojis with search term "{searchQuery}" not found. </EmptyState.Description>
      </EmptyState.Root>
    </Center>
  );
}
