import { Span, type SpanProps } from '@chakra-ui/react';
import type { DateArg } from 'date-fns';
import { formatDistance } from 'date-fns/formatDistance';

interface Props extends SpanProps {
  date?: DateArg<Date>;
}

export function FromNowDate({ date, ...props }: Props) {
  if (date == null) return null;
  return (
    <Span fontSize="xs" {...props}>
      {formatDistance(date, new Date(), { addSuffix: true })}
    </Span>
  );
}
