const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const authenticator = require('./authentication');
const MongoStore = require('connect-mongo');
let store = new MongoStore({ mongoUrl: process.env.DB_URL })

require('dotenv').config();

const app = express();
const router = require('./routes/router')

const client = mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database Connectd Succesfully!');
}).catch((err) => {
    console.log(err)
    console.log('Error connecting the Database');
})

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(cors({ origin: '*' })); //For FCC testing purposes only
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: 'express.sid',
    secret: 'this is a secret key',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: store,
}));
app.use(passport.initialize());
app.use(passport.session());

app.route('/').get((req, res) => {
    res.render('index');
})

router(app);
authenticator(app, client.db)

app.use(function (req, res, next) {
    res.status(404)
        .type('text')
        .send('Not Found');
});

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Listening on http://localhost:${process.env.PORT || 3000}`)
    }
})