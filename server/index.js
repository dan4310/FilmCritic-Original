const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Jhonjhon4310",
    database: "FilmCriticDatabase",
});


app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const created = req.body.created;

    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
        if (err) {
            console.log(err);
        }

        db.query("INSERT INTO users (username, password, email, firstName, lastName, created) VALUES (?, ?, ?, ?, ?, ?)",
        [username, hash, email, firstName, lastName, created],
        (err, result) => {
            if (err) {
                switch (err.errno) {
                    case 1062: 
                        res.send({ success: false, message: "User already exists!" } );
                        break;
                    default:
                        res.send({ success: false, message: err.sqlMessage });
                }
            } else {
                db.query("SELECT * FROM users WHERE username = ?;",
                username,
                (e, r) => {
                    res.send({ success: true, user: r[0]});
                });
                
            }
        });
    });

    
    
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                res.send({err: err});
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        res.send(result[0]);
                    } else {
                        res.send({ message: "Wrong username/password combination!" })
                    }
                });
            } else {
                res.send({ message: "User doesn't exist" });
            }
        }
    );
});

app.listen(3001, () => {
    console.log('Running server on port 3001');
});