import type { FileUploadFileError } from '@chakra-ui/react';

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
}): Promise<File | null> {
  if (quality <= 0) return null;
  const result = await new Promise<File | null>(resolve => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const height = img.height * ratio;
      const width = img.width * ratio;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        blob => {
          if (blob) void resolve(new File([blob], file.name, { type: 'image/webp' }));
          else void resolve(null);
        },
        'image/webp',
        quality,
      );
    };
  });
  if (!result) return null;

  if (result.size <= maxImageSize) return result;
  return resizeImage({ maxImageSize, file: result, maxHeight, maxWidth, quality: quality - 0.05 });
}

export async function resizeVideo({
  file,
  maxWidth = 640,
  maxHeight = 480,
  fps = 24,
  videoLength = 60 * 2,
  maxVideoSize,
}: {
  file: File;
  maxWidth?: number;
  maxHeight?: number;
  fps?: number;
  videoLength?: number;
  maxVideoSize: number;
}): Promise<File | null> {
  const {
    ALL_FORMATS,
    BlobSource,
    BufferTarget,
    Conversion,
    Input,
    Output,
    QUALITY_MEDIUM,
    QUALITY_VERY_LOW,
    WebMOutputFormat,
  } = await import('mediabunny');

  const input = new Input({ formats: ALL_FORMATS, source: new BlobSource(file) });
  const output = new Output({ format: new WebMOutputFormat(), target: new BufferTarget() });

  const conversion = await Conversion.init({
    input,
    output,
    video: {
      width: maxWidth,
      height: maxHeight,
      fit: 'contain',
      frameRate: fps,
      bitrate: QUALITY_MEDIUM,
    },
    audio: {
      bitrate: QUALITY_VERY_LOW,
      sampleRate: 48000,
    },
    tags: {},
    trim: { end: videoLength },
  });
  if (!conversion.isValid) {
    console.error('Conversion init error\n', conversion.discardedTracks);
    return null;
  }

  await conversion.execute();
  if (!output.target.buffer) {
    console.error('Conversion error. No Buffer.');
    return null;
  }

  const result = new File([output.target.buffer], crypto.randomUUID(), { type: output.format.mimeType });

  if (result.size > maxVideoSize) {
    console.error('File too big.');
    return null;
  }
  return result;
}

export const fileUploadErrorMap = (error: FileUploadFileError, file: File, max: number = 1) => {
  return (
    (
      {
        TOO_MANY_FILES: `Too many files. Max is ${max}.`,
        FILE_TOO_LARGE: `The file "${file.name}" is too large.`,
        FILE_TOO_SMALL: `The file "${file.name}" is too small.`,
        FILE_EXISTS: `The file "${file.name}" already exists.`,
        FILE_INVALID_TYPE: `The file "${file.name}" is not an image.`,
      } as Record<FileUploadFileError, string>
    )[error] || `The file "${file.name}" is invalid.`
  );
};
