const { PORT } = require("./config");
const express = require("express");
const { createUser } = require("./models/user")
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post('/create', (req, res) => {
    const { phoneNumber, password, lastName, firstName } = req.body
    createUser(phoneNumber, password, lastName, firstName)
    res.sendStatus(200)
})
