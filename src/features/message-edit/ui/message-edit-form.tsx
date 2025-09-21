import { formOptions, revalidateLogic } from '@tanstack/react-form';
import { type SerializedParagraphNode } from 'lexical';

import { type MessageBody } from '@/entities/messages';
import { HashtagNode } from '@/shared/lib/lexical/nodes/hashtag-node';
import { UserNode } from '@/shared/lib/lexical/nodes/user-node';
import { withForm } from '@/shared/lib/react-form';
import { Editor } from '@/shared/ui/editor';
import { HashtagLexicalPlugin } from './hashtag-lexical-plugin';
import { UsernameLexicalPlugin } from './user-lexical-plugin';

export const messageEditFormOptions = formOptions({
  validationLogic: revalidateLogic(),
  defaultValues: {
    body: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [],
            direction: null,
            textStyle: '',
            textFormat: 0,
          } as SerializedParagraphNode,
        ],
        direction: null,
      },
    } as MessageBody,
  },
});

export const MessageEditForm = withForm({
  ...messageEditFormOptions,
  render({ form, ...props }) {
    return (
      <form.AppForm>
        <form.Form {...props}>
          <form.AppField name="body">
            {field => (
              <Editor
                value={field.state.value}
                nodes={[UserNode, HashtagNode]}
                plugins={[<UsernameLexicalPlugin key={1} />, <HashtagLexicalPlugin key={2} />]}
                onChange={field.handleChange}
              />
            )}
          </form.AppField>
        </form.Form>
      </form.AppForm>
    );
  },
});
