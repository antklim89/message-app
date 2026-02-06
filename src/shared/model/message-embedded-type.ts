export const MessageEmbeddedType = {
  IMAGES: 'images',
  VIDEOS: 'videos',
  LINK: 'link',
} as const;

export type MessageEmbeddedType = (typeof MessageEmbeddedType)[keyof typeof MessageEmbeddedType];
