import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, createCommand, TextNode } from 'lexical';

import { $createHashtagNode, HashtagNode, type HashtagNodePayload } from '@/shared/lib/lexical/nodes/hashtag-node';

export const INSERT_HASHTAG = createCommand<HashtagNodePayload>();

const HashtagRegexp = /#([\w\d.-_]+)/;

export function HashtagLexicalPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([HashtagNode])) {
      throw new Error('HashtagLexicalPlugin: HashtagNode not registered on editor (initialConfig.nodes)');
    }

    return editor.registerNodeTransform(TextNode, textNode => {
      const [firstPart = '', hashtag, lastPart = ''] = textNode.getTextContent().split(HashtagRegexp);

      if (!hashtag) return false;
      const hashtagNode = $createHashtagNode({ text: hashtag });

      textNode.replace(hashtagNode);
      hashtagNode.insertBefore($createTextNode(firstPart));
      hashtagNode.insertAfter($createTextNode(lastPart));

      return false;
    });
  }, [editor]);

  return null;
}
