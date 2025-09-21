import { system } from '@chakra-ui/react/preset';
import {
  $applyNodeReplacement,
  $createTextNode,
  $getEditor,
  $isTextNode,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedTextNode,
  type Spread,
  TextNode,
} from 'lexical';

export interface HashtagNodePayload {
  text: string;
}
export type SerializedHashtagNode = Spread<HashtagNodePayload & { type: 'hashtag' }, SerializedTextNode>;

export class HashtagNode extends TextNode {
  constructor({ text }: HashtagNodePayload, key?: NodeKey) {
    super(text.startsWith('#') ? text : `#${text}`, key);
  }

  static getType(): string {
    return 'hashtag';
  }

  static clone(node: HashtagNode): HashtagNode {
    return new HashtagNode({ text: node.getTextContent() }, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    element.style = `color: ${system.token('colors.blue.500')};`;
    return element;
  }

  updateDOM(prevNode: this, dom: HTMLElement, config: EditorConfig): boolean {
    if (!prevNode.getTextContent().startsWith('#')) {
      $getEditor().update(() => {
        const textNode = $createTextNode(prevNode.getTextContent());
        prevNode.replace(textNode, false);
      });
      return true;
    }
    if (prevNode.getTextContent().includes(' ')) {
      $getEditor().update(() => {
        const [hashtag = '', text = ''] = prevNode.getTextContent().split(' ');
        const textNode = $createTextNode(` ${text}`);
        const newHashtagNode = $createHashtagNode({ text: hashtag });
        prevNode.replace(newHashtagNode, false);
        const nextSibling = prevNode.getNextSibling();
        if (nextSibling && $isTextNode(nextSibling)) nextSibling.mergeWithSibling(textNode);
      });
      return true;
    }
    return true;
  }

  canInsertTextAfter(): boolean {
    return true;
  }

  canInsertTextBefore(): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedHashtagNode): HashtagNode {
    const node = $createHashtagNode({ text: serializedNode.text });
    return node;
  }

  exportJSON(): SerializedHashtagNode {
    return {
      ...super.exportJSON(),
      text: this.getTextContent(),
      type: 'hashtag',
    };
  }
}

export function $createHashtagNode(payload: HashtagNodePayload): HashtagNode {
  return $applyNodeReplacement(new HashtagNode(payload));
}

export function $isHashtagNode(node: LexicalNode | null | undefined): node is HashtagNode {
  return node instanceof HashtagNode;
}
