import { Card, FormatNumber, Stat, type StatRootProps } from '@chakra-ui/react';
import type { LinkComponent, LinkProps } from '@tanstack/react-router';

export function ProfileStat({
  title,
  value,
  linkSlot,
  ...props
}: {
  value: number;
  title: string;
  linkSlot?: LinkComponent<'a'>;
} & LinkProps &
  StatRootProps) {
  return (
    <Card.Root asChild p={2} variant="subtle" _hover={linkSlot ? { bgColor: 'fg.subtle/10' } : undefined}>
      <Stat.Root as={linkSlot} {...props}>
        <Stat.Label>{title}</Stat.Label>
        <Stat.ValueText>
          <FormatNumber value={value} style="decimal" />
        </Stat.ValueText>
      </Stat.Root>
    </Card.Root>
  );
}
