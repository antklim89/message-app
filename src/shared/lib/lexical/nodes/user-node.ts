import { system } from '@chakra-ui/react/preset';
import {
  $applyNodeReplacement,
  $createTextNode,
  $getEditor,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedTextNode,
  type Spread,
  TextNode,
} from 'lexical';

export interface UserNodePayload {
  username: string;
  id: string;
}
export type SerializedUserNode = Spread<UserNodePayload & { type: 'user' }, SerializedTextNode>;

export class UserNode extends TextNode {
  #username: string;
  #id: string;

  constructor({ id, username }: UserNodePayload, key?: NodeKey) {
    super(`@${username}`, key);
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
    element.style = `color: ${system.token('colors.blue.500')};`;
    return element;
  }

  updateDOM(prevNode: this): boolean {
    if (!prevNode.getTextContent().startsWith('@')) {
      $getEditor().update(() => {
        const textNode = $createTextNode(prevNode.getTextContent());
        prevNode.replace(textNode, false);
      });
      return true;
    }
    return true;
  }

  canInsertTextAfter(): boolean {
    return false;
  }

  canInsertTextBefore(): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedUserNode): UserNode {
    const node = $createUserNode({ username: serializedNode.username, id: serializedNode.id });
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
