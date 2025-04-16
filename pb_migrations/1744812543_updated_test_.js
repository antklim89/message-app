/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4223880558")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT m.id, m.title  FROM messages m INNER JOIN users u on u.id = m.author GROUP BY u.id;"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_Vckw")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_w5pc",
    "max": 400,
    "min": 3,
    "name": "title",
    "pattern": "",
    "presentable": true,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4223880558")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT m.id, m.title FROM messages m INNER JOIN users u on u.id = m.author;"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Vckw",
    "max": 400,
    "min": 3,
    "name": "title",
    "pattern": "",
    "presentable": true,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("_clone_w5pc")

  return app.save(collection)
})
