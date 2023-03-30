const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const router = require('./routes/router')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database Connectd Succesfully!');
}).catch((err) => {
    console.log(err)
    console.log('Error connecting the Database');
})

app.route('/').get((req, res) => {
    // res.send('Jay Shree Krishna');
})

router(app);



app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Listening on http://localhost:${process.env.PORT || 3000}`)
    }
})