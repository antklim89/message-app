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

export function resizeVideo({
  file,
  maxWidth = 640,
  maxHeight = 480,
  fps = 24,
}: {
  file: File;
  maxWidth?: number;
  maxHeight?: number;
  fps?: number;
}): Promise<File | null> {
  return new Promise(resolve => {
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = 'auto';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to create context.');
      void resolve(null);
      return;
    }

    const url = URL.createObjectURL(file);
    video.src = url;

    video.onloadeddata = () => {
      let width = video.videoWidth;
      let height = video.videoHeight;
      const ratio = Math.min(maxWidth / width, maxHeight / height);

      width *= ratio;
      height *= ratio;

      canvas.width = width;
      canvas.height = height;

      const stream = canvas.captureStream(fps);
      const chunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(stream, { mimeType: file.type });

      mediaRecorder.ondataavailable = e => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        URL.revokeObjectURL(url);
        const transformedFile = new File(chunks, file.name, file);
        void resolve(transformedFile);
      };

      mediaRecorder.start();

      const renderFrame = () => {
        if (!(video.paused || video.ended)) {
          ctx.drawImage(video, 0, 0, width, height);
          requestAnimationFrame(renderFrame);
        }
      };

      video.play();
      renderFrame();

      video.onended = () => {
        mediaRecorder.stop();
      };
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      console.error('Video resize failed.');
      void resolve(null);
    };
  });
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
