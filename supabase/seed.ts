/** biome-ignore-all lint/performance/noAwaitInLoops: <ok> */
/** biome-ignore-all lint/suspicious/noConsole: <ok> */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: <ok> */
import { faker } from '@faker-js/faker';
import type { SerializedLinkNode } from '@lexical/link';
import { createClient } from '@supabase/supabase-js';
import type { SerializedParagraphNode, SerializedRootNode, SerializedTextNode } from 'lexical';

import { calculateLexicalTextLength } from '../src/shared/lib/lexical/utils';
import type { Database, Json } from '../src/shared/model/supabase-types.generated';

//@ts-expect-error
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
//@ts-expect-error
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

if (!(SUPABASE_URL && SUPABASE_SERVICE_ROLE)) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE are required.');
const sb = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

const PASSWORD = 'qwer1234';
const USERS_QTY = 0;
const MESSAGES_QTY = 5000;
const MESSAGES_LOOP_QTY = 3;

const hashtags = Array.from({ length: 50 }, () => `#${faker.lorem.word()}`);

function createLexicalText(text?: string): [SerializedTextNode] {
  return [
    {
      type: 'text',
      version: 1,
      detail: 0,
      format: 0,
      mode: 'normal',
      style: '',
      text: text ?? `${faker.lorem.sentence()} `,
    },
  ];
}

function createLexicalHashtag(): [SerializedTextNode, SerializedTextNode] {
  return [
    {
      type: 'hashtag',
      version: 1,
      detail: 0,
      format: 0,
      mode: 'normal',
      style: '',
      text: hashtags[faker.number.int({ min: 0, max: hashtags.length - 1 })],
    },
    ...createLexicalText(' '),
  ];
}

function createLexicalLink(): [SerializedLinkNode, SerializedTextNode] {
  const url = faker.internet.url();
  return [
    {
      type: 'autolink',
      version: 1,
      format: 'start',
      direction: 'ltr',
      indent: 0,
      url,
      children: [
        {
          type: 'text',
          version: 1,
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text: url,
        } as SerializedTextNode,
      ],
    },
    ...createLexicalText(' '),
  ];
}

function createRandomLexicalNode() {
  const lexicalNodeCreators = [createLexicalText, createLexicalHashtag, createLexicalLink];
  return lexicalNodeCreators[faker.number.int({ min: 0, max: lexicalNodeCreators.length - 1 })]();
}

function createLexicalRoot(): SerializedRootNode {
  const result = {
    type: 'root',
    direction: 'ltr',
    format: 'start',
    indent: 0,
    version: 1,
    children: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () =>
        ({
          type: 'paragraph',
          direction: 'ltr',
          format: 'start',
          indent: 0,
          textFormat: 0,
          textStyle: '',
          version: 1,
          children: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () =>
            createRandomLexicalNode(),
          ).flat(),
        }) satisfies SerializedParagraphNode,
    ),
  } satisfies SerializedRootNode;

  if (calculateLexicalTextLength(result) >= 600) return createLexicalRoot();
  return result;
}

/** USERS */
async function getUsers() {
  console.log('Creating users');
  for (let index = 0; index < USERS_QTY; index++) {
    const name = faker.internet.username();

    const { error } = await sb.auth.admin.createUser({
      email: faker.internet.email({ firstName: name }),
      password: PASSWORD,
      user_metadata: { username: name },
      email_confirm: true,
    });
    if (error) console.error(error);
  }

  const usersList = await sb.auth.admin.listUsers().then(d => d.data.users);
  for (const user of usersList) {
    const username = user.user_metadata.username;
    const date = faker.date.recent({ days: 9000 }).toISOString();
    await sb
      .from('profiles')
      .update({
        created: date,
        displayname: faker.internet.displayName({ firstName: username }),
        username,
        bio: faker.lorem.sentence({ min: 20, max: 200 }),
      })
      .eq('id', user.id);
  }

  const hasAdmin = usersList.some(user => user.email === 'admin@mail.com');
  if (!hasAdmin) {
    await sb.auth.admin.createUser({
      email: 'admin@mail.com',
      password: PASSWORD,
      user_metadata: { username: 'Admin' },
      email_confirm: true,
    });
  }

  return usersList;
}

/** MESSAGES */
async function getMessages(answers?: { id: string }[]) {
  console.log('Creating messages');
  const { data: users } = await sb.from('profiles').select('id').throwOnError();
  let messages: Database['public']['Tables']['messages']['Insert'][] = [];
  const result: { id: string }[] = [];

  for (let index = 0; index < MESSAGES_QTY; index++) {
    const body = createLexicalRoot();
    const updated = faker.date.recent({ days: 9000 }).toISOString();

    messages.push({
      body: body as Json,
      authorId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
      updated,
      created: faker.date.recent({ days: 600, refDate: updated }).toISOString(),
      answerId: answers?.[faker.number.int({ min: 0, max: answers.length - 1 })]?.id,
      body_tsvector: '',
    });

    if (messages.length === 500) {
      result.push(...(await sb.from('messages').insert(messages).select('id').throwOnError()).data);
      messages = [];
    }
  }

  result.push(...(await sb.from('messages').insert(messages).select('id').throwOnError()).data);
  return result;
}

/** LIKES */
async function getLikes() {
  console.log('Creating likes');
  await sb.from('likes').delete({ count: 'exact' }).neq('authorId', 'x');
  const users = await sb.from('profiles').select('id').throwOnError();
  const messages = await sb.from('messages').select('id').throwOnError();

  let likes: Database['public']['Tables']['likes']['Insert'][] = [];

  for (const user of users.data) {
    for (const message of messages.data) {
      if (faker.number.int({ min: 0, max: 3 }) === 1) continue;
      likes.push({
        authorId: user.id,
        messageId: message.id,
      });

      if (likes.length === 500) {
        await sb.from('likes').insert(likes).throwOnError();
        likes = [];
      }
    }
  }
  await sb.from('likes').insert(likes).throwOnError();
}

/** FAVORITES */
async function getFavorites() {
  console.log('Creating favorites');
  await sb.from('favorites').delete().neq('authorId', 'x');
  const users = await sb.from('profiles').select('id').throwOnError();
  const messages = await sb.from('messages').select('id').throwOnError();

  let favorites: Database['public']['Tables']['favorites']['Insert'][] = [];

  for (const user of users.data) {
    for (const message of messages.data) {
      if (faker.number.int({ min: 0, max: 3 }) === 1) continue;
      favorites.push({
        authorId: user.id,
        messageId: message.id,
      });

      if (favorites.length === 500) {
        await sb.from('favorites').insert(favorites).throwOnError();
        favorites = [];
      }
    }
  }
  await sb.from('favorites').insert(favorites).throwOnError();
}

await getUsers();
let messagesList = await getMessages();
for (let index = 0; index < MESSAGES_LOOP_QTY; index++) {
  messagesList = await getMessages(messagesList);
}

await getLikes();
await getFavorites();
