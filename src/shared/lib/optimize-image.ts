export function optimizeImage({
  file,
  maxWidth,
  maxHeight,
}: {
  file: File;
  maxWidth: number;
  maxHeight: number;
}): Promise<File | null> {
  return new Promise<File | null>(resolve => {
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
          if (blob) void resolve(new File([blob], file.name, file));
          else void resolve(null);
        },
        file.type,
        0.8,
      );
    };
  });
}
