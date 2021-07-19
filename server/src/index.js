const express = require('express');
const mysql = require('mysql');
const { Reviews } = require('./Entities/Reviews');
const { Users } = require('./Entities/User');
const cors = require('cors');
const { createConnection } = require('typeorm');
const { graphqlHTTP } = require('express-graphql');

const { schema } = require('./Schema');

const main = async () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    await createConnection({
        type: "mysql",
        database: "FilmCritic",
        username: "root",
        password:"Jhonjhon4310",
        logging: true,
        synchronize: false,
        entities: [Users, Reviews]
    });

    app.use("/graphql", graphqlHTTP({
        schema: schema,
        graphiql: true,
    }));


    // const db = mysql.createPool({
    //     host: "localhost",
    //     user: "root",
    //     password: "Jhonjhon4310",
    //     database: "FilmCriticDatabase",
    // });

    // app.post('/addReview', (req, res) => {
    //     const movieId = req.body.movieId;
    //     const description = req.body.description;
    //     const authorId = req.body.authorId;
    //     const entertainment = req.body.entertainment;
    //     const quality = req.body.quality;
    //     const created = req.body.created;

    //     db.query("INSERT INTO reviews (movieId, description, authorId, entertainment, quality, created) VALUES (?, ?, ?, ?, ?, ?);",
    //     [movieId, description, authorId, entertainment, quality, created],
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             res.send({ success: false, message: error});
    //         }

    //         db.query("SELECT * FROM reviews AS r JOIN users AS u ON r.authorId = u.id WHERE (r.authorId = ? AND r.movieId = ?);",
    //         [authorId, movieId],
    //         (error, response) => {
    //             if (err) {
    //                 console.log(err);
    //                 res.send({ success: false, message: error});
    //             }
    //             console.log(response);
    //             res.send({ success: true, data: response[0] });
    //         })
            
    //     })

    // });

    // app.get('/getReviews', (req, res) => {
    //     const movieId = req.query.movieId;

    //     db.query("SELECT *, r.id AS id, (SELECT COUNT(id) FROM likes AS l WHERE l.reviewId = r.id) as likes, (SELECT COUNT(id) FROM dislikes AS d WHERE d.reviewId = r.id) as dislikes FROM reviews AS r JOIN users AS u ON r.authorId = u.id WHERE movieId = ? ORDER BY likes DESC;",
    //     movieId,
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             res.send({ success: false, message: err });
    //         }
    //         console.log(result);
    //         res.send(result);
    //     });
    // });

    // app.get('/getUserLikes', (req, res) => {
    //     const userId = req.query.userId;
    //     console.log(req);

    //     db.query("SELECT * FROM likes AS l WHERE likerId = ?;",
    //     userId,
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             res.send({ success: false, message: err });
    //         }
    //         res.send({ success: true, result: result })
    //     })
    // })

    // app.post('/addLike', (req, res) => {
    //     const reviewId = req.body.reviewId;
    //     const likerId = req.body.likerId;
    //     const likeDate = req.body.likeDate;

    //     db.query("INSERT INTO likes (likerId, reviewId, likeDate) VALUES (?, ?, ?);",
    //     [likerId, reviewId, likeDate],
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             res.send({ success: false, message: err });
    //         } 
    //         db.query("SELECT * FROM likes WHERE likerId = ? AND reviewId = ?;",
    //         [likerId, reviewId],
    //         (error, resulting) => {
    //             if (err) {
    //                 console.log(err);
    //                 res.send({ success: false, message: err });
    //             } 
    //             res.send({ success: true, result: resulting });
    //         });
    //     });
    // })

    // app.post('/removeLike', (req, res) => {
    //     const reviewId = req.body.reviewId;
    //     const likerId = req.body.likerId;

    //     db.query("DELETE FROM likes WHERE likerId = ? and reviewId = ?;",
    //     [likerId, reviewId],
    //     (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             res.send({ success: false, message: err });
    //         } 
    //         res.send({ success: true, result: {likerId: likerId, reviewId: reviewId}});
    //     });
    // })

    // app.post('/register', (req, res) => {
    //     const username = req.body.username;
    //     const password = req.body.password;
    //     const email = req.body.email;
    //     const firstName = req.body.firstName;
    //     const lastName = req.body.lastName;
    //     const created = req.body.created;



    //     bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    //         if (err) {
    //             console.log(err);
    //         }

    //         db.query("INSERT INTO users (username, password, email, firstName, lastName, created) VALUES (?, ?, ?, ?, ?, ?)",
    //         [username, hash, email, firstName, lastName, created],
    //         (err, result) => {
    //             if (err) {
    //                 switch (err.errno) {
    //                     case 1062: 
    //                         res.send({ success: false, message: "User already exists", type: 'EXISTS' } );
    //                         break;
    //                     case 1406: 
    //                         res.send({ success: false, message: "Too long", type: 'LONG' } );
    //                         break;
    //                     default:
    //                         console.log(err);
    //                         res.send({ success: false, message: err.sqlMessage, type: erro.code });
    //                 }
    //             } else {
    //                 db.query("SELECT * FROM users WHERE username = ?;",
    //                 username,
    //                 (e, r) => {
    //                     res.send({ success: true, user: r[0]});
    //                 });
                    
    //             }
    //         });
    //     });    
        
    // });

    // app.post('/login', (req, res) => {
    //     const username = req.body.username;
    //     const password = req.body.password;

    //     db.query(
    //         "SELECT * FROM users WHERE username = ?;",
    //         username,
    //         (err, result) => {
    //             if (err) {
    //                 res.send({err: err});
    //             }

    //             if (result.length > 0) {
    //                 bcrypt.compare(password, result[0].password, (error, response) => {
    //                     if (response) {
    //                         res.send({ success: true, result: result[0]});
    //                     } else {
    //                         res.send({ message: "Wrong username/password combination!", success: false, type: 'WRONG_COMBO' })
    //                     }
    //                 });
    //             } else {
    //                 res.send({ message: "User doesn't exist", success: false, type: 'DNE' });
    //             }
    //         }
    //     );
    // });

    app.listen(3001, () => {
        console.log('Running server on port 3001');
    });

    }

    main().catch((err) => {
        console.log(err);
})
