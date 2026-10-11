import { ClipboardDOMImportExtension } from '@lexical/clipboard';
import { AutoFocusExtension, EditorStateExtension, HMRExtension, type HotContext } from '@lexical/extension';
import { HashtagExtension } from '@lexical/hashtag';
import { HistoryExtension } from '@lexical/history';
import { AutoLinkExtension } from '@lexical/link';
import { RichTextExtension } from '@lexical/rich-text';
import { configExtension, defineExtension } from 'lexical';

import { RICH_TEXT_EDITOR_NAMESPACE, theme } from './constants';
import { MATCHERS } from './link-matchers';
import { SubmitExtension } from '../ui/submit-extension';
import { UserSelectExtension } from '../ui/user-select-extension';

export const AppExtension = defineExtension({
  dependencies: [
    configExtension(HMRExtension, { hot: (import.meta as { hot?: HotContext }).hot ?? null }),
    RichTextExtension,
    ClipboardDOMImportExtension,
    EditorStateExtension,
    HistoryExtension,
    HashtagExtension,
    configExtension(AutoLinkExtension, { matchers: MATCHERS }),
    configExtension(AutoFocusExtension, { disabled: false }),
    SubmitExtension,
    UserSelectExtension,
  ],
  name: RICH_TEXT_EDITOR_NAMESPACE,
  namespace: RICH_TEXT_EDITOR_NAMESPACE,
  theme,
});
