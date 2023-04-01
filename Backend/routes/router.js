const { Student, createStudent, getStudents } = require('../models/Student');
const { Admin, createAdmin } = require('../models/Admin');
const { Forms } = require('../models/Forms')
const passport = require('passport');

let ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        console.log('Failed in ensureAuthenticated')
        res.redirect('/')
    }
}

module.exports = (app) => {
    // app.route('/admin/')
    app.route('/student/register')
        .post(async (req, res) => {
            console.log("INSIDE POST")
            const studentDetails = req.body;
            console.log(studentDetails);
            let newStudent = await createStudent(studentDetails);

            res.json(newStudent);
        })
        .get(async (req, res) => {
            let id = req.query.id;
            let studentsList = await getStudents(id);

            res.json(studentsList);
        })

    app.route('/admin/register')
        .post(async (req, res) => {
            const adminDetails = req.body;
            console.log('Admin Details:', adminDetails);
            let newAdmin = await createAdmin(adminDetails);
            res.send('Registration Successful');
        })

    app.route('/admin/login')
        .post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
            console.log(`User ${req.user.name} is Authenticated`)
            res.redirect('/admin/home')
        })

    app.route('/admin/home').get(ensureAuthenticated, (req, res) => {
        res.render('Admin', { username: req.user.username })
    })

    app.route('/form/add').post((req, res) => {
        console.log(req.body);

        res.send('Done')
    })

    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found')
    })

}   