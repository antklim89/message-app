import {
  MAX_MESSAGE_BODY_LENGTH,
  type MessageCreateType,
  MIN_MESSAGE_BODY_LENGTH,
} from '@message-app/entities/messages';
import { $getRoot, AppExtension, createHeadlessEditor } from '@message-app/rich-text';
import { TRPCError } from '@trpc/server';

export async function validateMessageBody(body: MessageCreateType['body']) {
  try {
    const editor = createHeadlessEditor(AppExtension.config);
    const editorState = editor.parseEditorState(body);
    editor.setEditorState(editorState);

    const length = editor.getEditorState().read(() => $getRoot().getTextContentSize());

    if (length < MIN_MESSAGE_BODY_LENGTH) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: `Message body too short. Min allowed is ${MIN_MESSAGE_BODY_LENGTH}`,
      });
    }
    if (length > MAX_MESSAGE_BODY_LENGTH) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: `Message body too long. Max allowed is ${MAX_MESSAGE_BODY_LENGTH}`,
      });
    }
  } catch {
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Invalid message body content.',
    });
  }
}
