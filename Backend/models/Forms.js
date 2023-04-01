const mongoose = require('mongoose');

let FormSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    branch: {
        type: String,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    assigned_to: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    } ],
    filled_by: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    } ],
});

let FormModel = new mongoose.model('Form', FormSchema);

module.exports = {
    Forms: FormModel
}