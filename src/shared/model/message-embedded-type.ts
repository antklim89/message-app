export const MessageEmbeddedType = {
  IMAGES: 'images',
  VIDEOS: 'videos',
  LINK: 'link',
  YOUTUBE: 'youtube',
} as const;

export type MessageEmbeddedType = (typeof MessageEmbeddedType)[keyof typeof MessageEmbeddedType];
