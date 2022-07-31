const connection = require('../mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_PASSWORD_KEY } = require("../config");

const generateAccesToken = (id) => {
    const paylod = {
        id
    }
    return jwt.sign(paylod, SECRET_PASSWORD_KEY, { expiresIn: "24h" })
}

exports.createUser = function (phoneNumber, password, lastName, firstName, res) {
    const hashPassword = bcrypt.hashSync(password, 7);
    const query = `INSERT INTO users(phone_number,first_name,last_name,password) VALUES ('${phoneNumber}','${firstName}','${lastName}','${hashPassword}');`
    connection.query(query);
    res.sendStatus(200)
}

exports.loginUser = function (phoneNumber, password, res) {
    const query = `SELECT id, password  FROM seeu_messanger.users  WHERE phone_number = '${phoneNumber}';`
    connection.query(query, (err, rows, fields) => {
        if (rows.length) {
            const userId = rows[0].id
            const hashedPassword = rows[0].password
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

exports.getUserId = (phoneNumber, callback) => {
    const query = `SELECT id   FROM seeu_messanger.users  WHERE phone_number = '${phoneNumber}';`
    connection.query(query, (err, rows, fields) => {
        const userId = rows.length ? rows[0].id : null
        callback(userId)
    })
}

exports.getUsers = (contactsId, callback) => {
    const usersId = contactsId.toString()
    const getContact = `SELECT * FROM seeu_messanger.users  WHERE id IN (${usersId});`
    connection.query(getContact, (err, rows, fields) => {
        callback(rows)
    })
}