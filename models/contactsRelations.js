const connection = require('../mysql')

exports.getContactRelations = function (userId, contactId, res) {
  const query = `SELECT id   FROM contacts_relations  WHERE user_id = '${userId.id}' AND contact_id = '${contactId}';`
  connection.query(query, (err, rows, fields) => {
    if (!rows.length) {
      insertContactRelations(userId, contactId)
      res.sendStatus(200)
    } else {
      res.status(400).json({ errorMessage: "contact with this number already in your contact list" })
    }
  })
}

function insertContactRelations(userId, contactId) {
  const insertId = `INSERT INTO contacts_relations(user_id,contact_id) VALUES ('${userId.id}', '${contactId}');`
  connection.query(insertId);
}