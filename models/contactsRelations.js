const connection = require('../mysql')

exports.getContactsRelations = function (userId, contactId, callback) {
  const query = `SELECT * FROM contacts_relations  WHERE user_id = '${userId}' AND contact_id = '${contactId}';`
  connection.query(query, (err, rows, fields) => callback(rows.length ? rows[0] : null))
}

exports.insertContactsRelations = function (userId, contactId) {
  const insertId = `INSERT INTO contacts_relations(user_id,contact_id) VALUES ('${userId}', '${contactId}');`
  connection.query(insertId);
}

exports.getContactsId = function (userId, callback) {
  const query = `SELECT contact_id FROM contacts_relations  WHERE user_id = '${userId}'`
  connection.query(query, (err, rows, fields) => {
    callback(rows.map((contactId) => contactId.contact_id))
  })
}

