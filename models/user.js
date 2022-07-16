const connection = require('../mysql')

exports.createUser = function (phoneNumber, password, lastName, firstName) {
    const query = `INSERT INTO users(phone_number,first_name,last_name,password) VALUES ('${phoneNumber}','${firstName}','${lastName}','${password}');`
    connection.query(query);
}