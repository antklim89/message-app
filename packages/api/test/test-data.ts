import { faker } from '@faker-js/faker';
import type { User } from '@message-app/auth';
import type { messageTable } from '@message-app/db';
import type { SerializedEditorState, SerializedParagraphNode, SerializedTextNode } from '@message-app/rich-text';

export function createTestMessageBody(...textArr: string[]): SerializedEditorState {
  const paragraphs = textArr.map(
    text =>
      ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            version: 0,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
          },
        ] as SerializedTextNode[],
        version: 0,
        direction: 'ltr',
        format: 'start',
        indent: 0,
        textFormat: 0,
        textStyle: '',
      }) as SerializedParagraphNode,
  );

  return {
    root: {
      children: paragraphs,
      direction: 'ltr',
      format: 'start',
      type: 'root',
      indent: 0,
      version: 0,
    },
  };
}

export function createTestUserData(): User {
  const createdAt = faker.date.between({ from: '2001-01-01T00:00:00.000Z', to: '2010-01-01T00:00:00.000Z' });
  const updatedAt = faker.date.future({ refDate: createdAt });
  const name = faker.person.firstName();

  return {
    id: faker.string.uuid({ version: 4 }),
    createdAt,
    updatedAt,
    name,
    email: faker.internet.email({ firstName: name }),
    emailVerified: true,
  };
}
export function createTestMessageData({
  message,
  userId,
}: {
  message: Partial<Omit<typeof messageTable.$inferInsert, 'userId' | 'breedName'>>;
  userId: string;
}): typeof messageTable.$inferInsert {
  return {
    id: faker.string.uuid({ version: 7 }),
    body: { root: { children: [], direction: 'ltr', format: 'start', type: 'root', indent: 0, version: 0 } },
    authorId: userId,
    publishedAt: faker.date.anytime().toISOString(),
    ...message,
  };
}
/*

export function createTestAdImageData({
  adImage,
  adId,
}: {
  adId: string;
  adImage?: Partial<AdImageInsertType>;
}): AdImageInsertType {
  return {
    id: faker.string.uuid(),
    adId,
    url: faker.image.url(),
    blurDataUrl: faker.image.dataUri(),
    ...adImage,
  };
}

export function createTestAnimalTypeData(data: Partial<AnimalTypeInsertType> = {}): AnimalTypeInsertType {
  return {
    name: faker.string.uuid(),
    description: faker.lorem.text(),
    imageUrl: faker.image.url(),
    ...data,
  };
}

export function createTestAnimalBreedData({
  animalTypeName,
  breed = {},
}: {
  animalTypeName: string;
  breed?: Partial<Omit<AnimalBreedInsertType, 'animalTypeName'>>;
}): AnimalBreedInsertType {
  return {
    name: faker.string.uuid(),
    description: faker.lorem.text(),
    animalTypeName,
    ...breed,
  };
}
*/
