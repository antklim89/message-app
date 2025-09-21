import { addClassNamesToElement, mergeRegister } from '@lexical/utils';
import {
  $applyNodeReplacement,
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  type EditorConfig,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type SerializedTextNode,
  type Spread,
  TextNode,
} from 'lexical';

import { getWordFromText } from '@/shared/lib/utils';
export const INSERT_USER = createCommand<UserNodePayload>();

export interface UserNodePayload {
  username: string;
  id: string;
}
export type SerializedUserNode = Spread<UserNodePayload & { type: 'user' }, SerializedTextNode>;

export class UserNode extends TextNode {
  #username: string;
  #id: string;

  constructor({ id, username }: UserNodePayload, key?: NodeKey) {
    super(username.startsWith('@') ? username : `@${username}`, key);
    this.#username = username;
    this.#id = id;
  }

  static getType(): string {
    return 'user';
  }

  static clone(node: UserNode): UserNode {
    return new UserNode({ id: node.#id, username: node.#username }, node.__key);
  }

  getUsername(): string {
    return this.#username;
  }

  getId(): string {
    return this.#id;
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

  static importJSON(serializedNode: SerializedUserNode): UserNode {
    const node = $createUserNode({ username: serializedNode.username, id: serializedNode.id });
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedUserNode {
    return {
      ...super.exportJSON(),
      id: this.#id,
      username: this.#username,
      type: 'user',
    };
  }
}

export function $createUserNode(payload: UserNodePayload): UserNode {
  return $applyNodeReplacement(new UserNode(payload));
}

export function $isUserNode(node: LexicalNode | null | undefined): node is UserNode {
  return node instanceof UserNode;
}

function registerInsertUserCommand(editor: LexicalEditor) {
  return editor.registerCommand(
    INSERT_USER,
    payload => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return true;
      const selectedNode = selection.getNodes()[0];

      if ($isUserNode(selectedNode) && selection.isCollapsed()) {
        selectedNode.replace($createUserNode(payload));
        selectedNode.selectEnd();
        return true;
      }

      if ($isTextNode(selectedNode) && selection.isCollapsed()) {
        const focusOffset = selection.focus.offset;
        const textContent = selectedNode.getTextContent();
        const word = getWordFromText(textContent, focusOffset);

        const newTextNode = $createTextNode(textContent.replace(word, ''));
        const newUserNode = $createUserNode(payload);
        selectedNode.replace(newTextNode);
        newTextNode.insertAfter(newUserNode, false);
        newUserNode.selectEnd();
        return true;
      }

      const newUserNode = $createUserNode(payload);
      selection.insertNodes([newUserNode]);
      return true;
    },
    COMMAND_PRIORITY_EDITOR,
  );
}

function registerUpdateUserCommand(editor: LexicalEditor) {
  return editor.registerNodeTransform(UserNode, userNode => {
    const text = userNode.getTextContent();
    if (text.startsWith('@') && text.substring(1) === userNode.getUsername()) return true;

    const textNode = $createTextNode(text);
    textNode.setFormat(userNode.getFormat());
    userNode.replace(textNode);

    return true;
  });
}

export function registerUserCommands(editor: LexicalEditor) {
  return mergeRegister(registerInsertUserCommand(editor), registerUpdateUserCommand(editor));
}
