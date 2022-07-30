const connection = require('../mysql')

exports.getContactRelations = function (userId, contactId, callback) {
  const query = `SELECT id   FROM contacts_relations  WHERE user_id = '${userId.id}' AND contact_id = '${contactId}';`
  connection.query(query, (err, rows, fields) => {
    const id = rows.length ? rows[0].id : null
    callback(id)
  })
}

exports.insertContactRelations = function (userId, contactId) {
  const insertId = `INSERT INTO contacts_relations(user_id,contact_id) VALUES ('${userId.id}', '${contactId}');`
  connection.query(insertId);
}