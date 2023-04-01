const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

let AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    forms: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true
    } ]

});


let AdminModel = new mongoose.model('Admin', AdminSchema);
let createAdmin = async ({ name, email, password }) => {
    let myUser = await AdminModel.findOne({ email: email });
    if (myUser) {
        // User already exist
        return myUser;
    }

    myUser = await AdminModel.create({
        name: name,
        email: email,
        password: password
    })

    return myUser;
}

module.exports = {
    Admin: AdminModel,
    createAdmin: createAdmin
}