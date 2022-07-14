const express = require("express");

const PORT = process.env.PORT || 3001;

const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


app.post('/create', (req, res) => {
    const { phoneNumber, password, lastName, firstName } = req.body
    console.log(phoneNumber, password, lastName, firstName)
    res.sendStatus(200)
})
