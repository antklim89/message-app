const { faker } = require('@faker-js/faker');

const USERS_COUNT = 50;
const MESSAGES_COUNT = 500;
const ANSWERS_COUNT = 1000;
/**
 * @type {import('../pb_data/types')}
 */
$app.rootCmd.addCommand(
  new Command({
    use: 'seed',
    run() {
      $app.db().delete('users').execute();
      $app.db().delete('messages').execute();
      $app.db().delete('likes').execute();

      const usersCollection = $app.findCollectionByNameOrId('users');
      const messagesCollection = $app.findCollectionByNameOrId('messages');
      const likesCollection = $app.findCollectionByNameOrId('likes');

      for (let index = 0; index < USERS_COUNT; index++) {
        const username = faker.internet.username();
        const email = faker.internet.email({ firstName: username });
        const userRecord = new Record(usersCollection, {
          email: email,
          name: username,
          password: 'qwer1234',
          passwordConfirm: 'qwer1234',
          verified: true,
        });
        $app.save(userRecord);
      }
      const users = $app.findAllRecords('users');
      for (let index = 0; index < MESSAGES_COUNT; index++) {
        const messageRecord = new Record(messagesCollection, {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraph({ min: 3, max: 7 }),
          author: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        });
        $app.save(messageRecord);
      }
      const messages = $app.findAllRecords('messages');
      for (let index = 0; index < ANSWERS_COUNT; index++) {
        const messageRecord = new Record(messagesCollection, {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraph({ min: 3, max: 7 }),
          author: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
          answerTo: messages[faker.number.int({ min: 0, max: messages.length - 1 })].id,
        });
        $app.save(messageRecord);
      }
    },
  }),
);
