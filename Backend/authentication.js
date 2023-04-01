const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
require('dotenv').config();


module.exports = (app, myDatabase) => {
    passport.serializeUser((admin, done) => {
        done(null, admin._id);
    })

    passport.deserializeUser((id, done) => {
        myDatabase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
            if (err) return console.error(err);
            done(null, doc);
        })
        // done(null, null);
    })

    passport.use(new LocalStrategy((email, password, done) => {
        myDatabase.findOne({ email: email }, (err, user) => {
            // console.log(`User ${username} attemped to login`);
            if (err) {
                return done(err);
            }
            else if (!user) {
                console.log('User dont exist');
                return done(null, false);
            }
            // else if (password != user.password)
            else if (password != user.password) {
                console.log('Incorrect password');
                return done(null, false);
            }
            else {
                console.log('user Authenticated')
                return done(null, user);
            }
        })
    }))
}