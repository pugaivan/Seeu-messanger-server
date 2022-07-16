const express = require("express");
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'seeu_messanger'
});

const cors = require('cors')
const app = express();
connection.connect();

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post('/create', (req, res) => {
    const { phoneNumber, password, lastName, firstName } = req.body
    const query = `INSERT INTO users(phone_number,first_name,last_name,password) VALUES ('${phoneNumber}','${firstName}','${lastName}','${password}');`
    connection.query(query);
    res.sendStatus(200)
})
