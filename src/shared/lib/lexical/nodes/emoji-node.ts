import {
  $applyNodeReplacement,
  $getSelection,
  $isRangeSelection,
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

export const INSERT_EMOJI = createCommand<EmojiNodePayload>();

export interface EmojiNodePayload {
  label: string;
  unicode: string;
}
export type SerializedEmojiNode = Spread<EmojiNodePayload & { type: 'emoji' }, SerializedTextNode>;

export class EmojiNode extends TextNode {
  #label: string;

  constructor({ label, unicode }: EmojiNodePayload, key?: NodeKey) {
    super(unicode, key);
    this.#label = label;
  }

  static getType(): string {
    return 'emoji';
  }

  static clone(node: EmojiNode): EmojiNode {
    return new EmojiNode({ label: node.#label, unicode: node.getTextContent() }, node.__key);
  }

  getLabel(): string {
    return this.#label;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    return element;
  }

  canInsertTextAfter(): boolean {
    return false;
  }

  canInsertTextBefore(): boolean {
    return false;
  }

  static importJSON({ label, unicode }: SerializedEmojiNode): EmojiNode {
    const node = $createEmojiNode({ label, unicode });
    return node;
  }

  exportJSON(): SerializedEmojiNode {
    const json = super.exportJSON();
    return {
      ...json,
      unicode: json.text,
      label: this.#label,
      type: 'emoji',
    };
  }
}

export function $createEmojiNode(payload: EmojiNodePayload): EmojiNode {
  return $applyNodeReplacement(new EmojiNode(payload));
}

export function $isEmojiNode(node: LexicalNode | null | undefined): node is EmojiNode {
  return node instanceof EmojiNode;
}

function registerInsertEmojiCommand(editor: LexicalEditor) {
  return editor.registerCommand(
    INSERT_EMOJI,
    payload => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return true;

      const newEmojiNode = $createEmojiNode(payload);
      selection.insertNodes([newEmojiNode]);
      return true;
    },
    COMMAND_PRIORITY_EDITOR,
  );
}

export function registerEmojiCommands(editor: LexicalEditor) {
  return registerInsertEmojiCommand(editor);
}
