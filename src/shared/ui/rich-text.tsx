/** biome-ignore-all lint/suspicious/noBitwiseOperators: this use is expected */
import type { ReactNode } from 'react';
import { Box, Link as ChakraLink, Text } from '@chakra-ui/react';
import type {} from '@lexical/hashtag';
import type { SerializedLinkNode } from '@lexical/link';
import { Link } from '@tanstack/react-router';
import type { SerializedLexicalNode, SerializedParagraphNode, SerializedRootNode, SerializedTextNode } from 'lexical';
import { z } from 'zod/v4-mini';

import type { SerializedUserNode } from '@/shared/lib/lexical/nodes/user-node';
import { IS_BOLD, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE } from '../lib/lexical/constants';

function convertLexicalText(data: SerializedLexicalNode): ReactNode {
  if (data.type === 'root') {
    const { children } = data as SerializedRootNode;
    return (
      <Box css={{ '& p': { minH: '1rem' } }} lineHeight={1.2} key={Math.random()}>
        {children.map(convertLexicalText)}
      </Box>
    );
  }
  if (data.type === 'hashtag') {
    const { text, format } = data as SerializedTextNode;
    return (
      <ChakraLink {...getFormatStyles(format)} key={Math.random()} asChild>
        <Link to="/hashtag/$hashtag" params={{ hashtag: text.substring(1) }}>
          {text}
        </Link>
      </ChakraLink>
    );
  }

  if (data.type === 'paragraph') {
    const { children } = data as SerializedParagraphNode;
    return <Text key={Math.random()}>{children.map(convertLexicalText)}</Text>;
  }

  if (data.type === 'user') {
    const { text, id, format } = data as SerializedUserNode;
    return (
      <ChakraLink {...getFormatStyles(format)} key={Math.random()} asChild>
        <Link to="/profile/$profileId" params={{ profileId: id }}>
          {text}
        </Link>
      </ChakraLink>
    );
  }
  if (data.type === 'text') {
    const { text, format } = data as SerializedTextNode;

    return (
      <Text {...getFormatStyles(format)} key={Math.random()} as="span">
        {text}
      </Text>
    );
  }
  if (data.type === 'link') {
    const { children, url } = data as SerializedLinkNode;
    const { success } = z.string().check(z.url()).safeParse(url);
    if (!success) return '[Invalid Link]';

    if (url.startsWith(location.origin)) {
      return (
        <ChakraLink asChild key={Math.random()}>
          <Link to={url.replace(location.origin, '')}>{children.map(convertLexicalText)}</Link>
        </ChakraLink>
      );
    }
    return (
      <ChakraLink asChild key={Math.random()}>
        <Link target="_blank" rel="noopener noreferrer" to={url}>
          {children.map(convertLexicalText)}
        </Link>
      </ChakraLink>
    );
  }
  if (data.type === 'linebreak') {
    return <br key={Math.random()} />;
  }
  return '';
}

function getFormatStyles(format: number) {
  const isBold = (format & IS_BOLD) === IS_BOLD;
  const isItalic = (format & IS_ITALIC) === IS_ITALIC;
  const isStrikethrough = (format & IS_STRIKETHROUGH) === IS_STRIKETHROUGH;
  const isUnderline = (format & IS_UNDERLINE) === IS_UNDERLINE;

  return {
    fontStyle: isItalic ? 'italic' : undefined,
    fontWeight: isBold ? 'bold' : undefined,
    textDecoration: `${isStrikethrough ? 'line-through' : ''} ${isUnderline ? 'underline' : ''}`.trim(),
  };
}

export function RichText({ data }: { data: SerializedRootNode }) {
  return convertLexicalText(data);
}
