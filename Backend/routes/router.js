const { Student, createStudent, getStudents } = require('../models/Student');

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
}   