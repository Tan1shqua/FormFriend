const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

const app = express();
const router = require('./routes/router')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database Connectd Succesfully!');
}).catch((err) => {
    console.log(err)
    console.log('Error connecting the Database');
})

app.use('/public', express.static(process.cwd() + '/public'));
app.use(cors({ origin: '*' })); //For FCC testing purposes only
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

router(app);

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