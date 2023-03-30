const mongoose = require('mongoose');

let AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    facultyId: {
        type: String,
        required: true
    },
    forms: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    }

});

let AdminModel = new mongoose.Model('Admin', AdminSchema);

module.exports = {
    Admin: AdminModel
}