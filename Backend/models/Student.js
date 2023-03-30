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

let StudentModel = new mongoose.Model('Student', StudentSchema);

module.exports = {
    Student: StudentModel
}