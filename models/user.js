const connection = require('../mysql')
const bcrypt = require('bcrypt');
const { SECRET_PASSWORD_KEY } = require("../config");
const jwt = require('jsonwebtoken');

const generateAccesToken = (id) => {
    const paylod = {
        id
    }
    return jwt.sign(paylod, SECRET_PASSWORD_KEY, { expiresIn: "24h" })
}

exports.createUser = function (phoneNumber, password, lastName, firstName) {
    const hashPassword = bcrypt.hashSync(password, 7);
    const query = `INSERT INTO users(phone_number,first_name,last_name,password) VALUES ('${phoneNumber}','${firstName}','${lastName}','${hashPassword}');`
    connection.query(query);
}

exports.loginUser = function (phoneNumber, password, res) {
    let userId = null;
    let hashedPassword = null;

    const query = `SELECT id, password  FROM seeu_messanger.users  WHERE phone_number = '${phoneNumber}';`
    connection.query(query, (err, rows, fields) => {
        if (rows.length) {
            userId = rows[0].id
            hashedPassword = rows[0].password
            const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);
            if (isPasswordCorrect) {
                const token = generateAccesToken(userId)
                return res.json({ token })
            } else {
                res.status(400).json({ errorMessage: "password is wrong" })
            }
        } else {
            res.status(400).json({ errorMessage: "user not found" })
        }
    });
}