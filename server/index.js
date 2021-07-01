const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Jhonjhon4310",
    database: "FilmCriticDatabase",
    insecureAuth: true
});


app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    db.query("INSERT INTO users (username, password, email, firstName, lastName) VALUES (?, ?, ?, ?, ?)",
    [username, password, email, firstName, lastName],
    (err, result) => {
       console.log(err);
    })
    
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username/password combination!"});
            }
        }
    );
});

app.listen(3001, () => {
    console.log('Running server on port 3001');
});