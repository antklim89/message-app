import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { registerUserCommands, UserNode } from '@/shared/lib/lexical';

export function LexicalUserPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([UserNode])) {
      throw new Error('UserLexicalPlugin: UserNode not registered on editor (initialConfig.nodes)');
    }

    return registerUserCommands(editor);
  }, [editor]);

  return null;
}
