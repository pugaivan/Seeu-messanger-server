const express = require("express");
const cors = require('cors')
const jwt = require('jsonwebtoken');

const { PORT } = require("./config");
const { createUser, loginUser, getUserId } = require("./models/user")
const { getContactsRelations, insertContactsRelations } = require("./models/contactsRelations")
const { SECRET_PASSWORD_KEY } = require("./config");

const app = express();
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post('/create', (req, res) => {
    const { phoneNumber, password, lastName, firstName } = req.body
    getUserId(phoneNumber, (userId) => {
        if (userId) {
            res.status(400).json({ errorMessage: "the user with this number is already registered" })
        } else {
            createUser(phoneNumber, password, lastName, firstName, res)
        }
    })
})

app.post('/login', (req, res) => {
    const { phoneNumber, password } = req.body
    loginUser(phoneNumber, password, res)
})


app.post('/contact', (req, res) => {
    const { phoneNumber } = req.body
    const decodedJwt = jwt.verify(req.headers.authorization, SECRET_PASSWORD_KEY);
    getUserId(phoneNumber, (contactId) => {
        if (contactId) {
            getContactsRelations(decodedJwt.id, contactId, (relations) => {
                if (!relations) {
                    insertContactsRelations(decodedUserId, contactId)
                    res.sendStatus(200)
                } else {
                    res.status(400).json({ errorMessage: "contact with this number already in your contact list" })
                }
            })
        } else {
            res.status(400).json({ errorMessage: "user with this number not found" })
        }
    })
})
