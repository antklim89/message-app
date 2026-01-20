export const MessageEmbeddedType = {
  IMAGES: 'images',
  VIDEOS: 'videos',
} as const;

export type MessageEmbeddedType = (typeof MessageEmbeddedType)[keyof typeof MessageEmbeddedType];
