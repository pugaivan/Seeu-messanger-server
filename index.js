const { PORT } = require("./config");
const express = require("express");
const { createUser, loginUser, getUserId } = require("./models/user")
const cors = require('cors')
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
