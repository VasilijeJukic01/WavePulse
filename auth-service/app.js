const express = require('express');
const { sequelize, Account } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config();

let corsOptions = {
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    optionsSuccessStatus: 200
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {
    const obj = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        registrationDate: new Date(),
        countryId: req.body.countryId
    };
    Account.create(obj).then( rows => {
        const usr = {
            userId: rows.id,
            user: rows.username
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: token });
    }).catch( err => res.status(500).json(err) );
});


app.post('/login', (req, res) => {
    Account.findOne({ where: { username: req.body.username } })
        .then( usr => {
            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.username
                };
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token });
            }
            else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});


app.listen({ port: 8001 }, async () => {
    await sequelize.authenticate();
});