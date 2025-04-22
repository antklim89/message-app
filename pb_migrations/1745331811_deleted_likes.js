/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2190274710");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": "author = @request.auth.id",
    "deleteRule": "author = @request.auth.id",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": true,
        "collectionId": "pbc_2605467279",
        "hidden": false,
        "id": "relation3065852031",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "message",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": true,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation3182418120",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "author",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      }
    ],
    "id": "pbc_2190274710",
    "indexes": [
      "CREATE UNIQUE INDEX `idx_message_author` ON `likes` (\n  `message`,\n  `author`\n)"
    ],
    "listRule": "",
    "name": "likes",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": ""
  });

  return app.save(collection);
})
