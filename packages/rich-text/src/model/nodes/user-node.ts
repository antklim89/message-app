import { addClassNamesToElement } from '@lexical/utils';
import {
  $create,
  $createTextNode,
  $getState,
  $setState,
  createState,
  type EditorConfig,
  type LexicalEditor,
  type LexicalNode,
  type SerializedTextNode,
  type Spread,
  TextNode,
} from 'lexical';

export interface UserNodePayload {
  name: string;
  id: string;
}
export type SerializedUserNode = Spread<SerializedTextNode, UserNodePayload & { type: 'user' }>;

const nameState = createState('name', {
  parse: value => value as string,
});
const idState = createState('id', {
  parse: value => value as string,
});

export class UserNode extends TextNode {
  $config() {
    return this.config('user', {
      extends: TextNode,
      stateConfigs: [
        { flat: true, stateConfig: nameState },
        { flat: true, stateConfig: idState },
      ],
    });
  }

  static getType(): string {
    return 'user';
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    addClassNamesToElement(element, config.theme.user);
    return element;
  }

  canInsertTextAfter(): boolean {
    return false;
  }

  canInsertTextBefore(): boolean {
    return false;
  }

  canHaveFormat(): boolean {
    return false;
  }
}

export function $createUserNode(payload: UserNodePayload) {
  const userNode = $create(UserNode).setTextContent(`@${payload.name}`);
  $setState(userNode, nameState, payload.name);
  $setState(userNode, idState, payload.id);

  return userNode;
}

export function $isUserNode(node: LexicalNode | null | undefined): node is UserNode {
  return node instanceof UserNode;
}

export function registerUpdateUserCommand(editor: LexicalEditor) {
  return editor.registerNodeTransform(UserNode, userNode => {
    const text = userNode.getTextContent();
    const name = $getState(userNode, nameState);

    if (text.startsWith('@') && text.substring(1) === name) return true;

    const textNode = $createTextNode(text);
    textNode.setFormat(userNode.getFormat());
    userNode.replace(textNode);

    return true;
  });
}
