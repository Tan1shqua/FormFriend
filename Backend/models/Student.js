const mongoose = require('mongoose');

let StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    enrollment_no: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    sem: {
        type: Number,
        required: true
    },
    isD2D: {
        type: Boolean,
        required: true
    },
    forms: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Form' } ]
});

let StudentModel = new mongoose.model('Student', StudentSchema);

let createStudent = async ({ name, enroll_no, email, branch, sem, isD2D }) => {
    let newStudent = await StudentModel.create({
        name: name,
        enrollment_no: Number(enroll_no),
        email: email,
        branch: branch,
        sem: Number(sem),
        isD2D: (isD2D) ? (true) : (false)
    });
    console.log('User Created!')

    return newStudent;
}

let getStudents = async (id) => {
    let studentList;
    if (!id) {
        // NO ID PROVIDED (ALL Students are requested)
        console.log(`All Students requested`);
        studentList = await StudentModel.find({});
        console.log(studentList);
        return studentList;
    } else {
        console.log(`Student with id: ${id} requested`);
        studentList = await StudentModel.find({ _id: id });
        console.log(studentList);
        return studentList;
    }
}

module.exports = {
    Student: StudentModel,
    createStudent: createStudent,
    getStudents: getStudents
}