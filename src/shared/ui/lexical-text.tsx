import type { ReactNode } from 'react';
import { Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import type {
  SerializedEditorState,
  SerializedLexicalNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from 'lexical';

import type { SerializedUserNode } from '@/shared/lib/lexical/nodes/user-node';

function convertLexicalText(data: SerializedLexicalNode): ReactNode {
  if (data.type === 'paragraph') {
    const { children } = data as SerializedParagraphNode;
    return <Text key={Math.random()}>{children.map(convertLexicalText)}</Text>;
  }
  if (data.type === 'user') {
    const { text, id } = data as SerializedUserNode;
    return (
      <ChakraLink key={Math.random()} asChild>
        <Link to="/profile/$profileId" params={{ profileId: id }}>
          {text}
        </Link>
      </ChakraLink>
    );
  }
  if (data.type === 'text') {
    const { text } = data as SerializedTextNode;
    return (
      <Text key={Math.random()} as="span">
        {text}
      </Text>
    );
  }
  if (data.type === 'linebreak') {
    return <br key={Math.random()} />;
  }
  return '';
}
export function LexicalText({ data }: { data: SerializedEditorState<SerializedLexicalNode> }) {
  return data?.root?.children?.map(convertLexicalText);
}
