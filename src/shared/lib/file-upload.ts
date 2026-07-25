import type { FileUploadFileError } from '@chakra-ui/react';

import { err, errUnexpected, ok, type Result } from './result';

export async function resizeImage({
  file,
  maxWidth,
  maxHeight,
  maxImageSize,
  quality = 0.8,
}: {
  file: File;
  maxWidth: number;
  maxHeight: number;
  maxImageSize: number;
  quality?: number;
}) {
  if (quality <= 0) return errUnexpected('Failed to transform image.');
  const { fail, error, result } = await new Promise<Result<File, 'unexpected'>>(resolve => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const height = img.height * ratio;
      const width = img.width * ratio;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(errUnexpected('Failed to create canvas context'));

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        blob => {
          if (blob) resolve(ok(new File([blob], crypto.randomUUID(), { type: 'image/webp' })));
          else resolve(errUnexpected('Failed to transform image.'));
        },
        'image/webp',
        quality,
      );
    };
  });
  if (fail) return err(error);

  if (result.size <= maxImageSize) return ok(result);
  return resizeImage({ maxImageSize, file: result, maxHeight, maxWidth, quality: quality - 0.05 });
}

export const fileUploadErrorMap = (error: FileUploadFileError, file: File, max: number = 1) => {
  return (
    (
      {
        TOO_MANY_FILES: `Too many files. Max is ${max}.`,
        FILE_TOO_LARGE: `The file "${file.name}" is too large.`,
        FILE_TOO_SMALL: `The file "${file.name}" is too small.`,
        FILE_EXISTS: `The file "${file.name}" already exists.`,
        FILE_INVALID_TYPE: `The file "${file.name}" is invalid.`,
      } as Record<FileUploadFileError, string>
    )[error] || `The file "${file.name}" is invalid.`
  );
};
