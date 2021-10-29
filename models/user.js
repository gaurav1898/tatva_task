const mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
const roles = require('../seed/Roles');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        match: [/\S+@\S+\.\S+/, "Invalid"]
    },
    password: {
        type: String,
        required: false
    },
    dob: {
        type: DateOnly,
    },
    role: {
        type: String,
        enum: roles.Roles,
        default: "User"
    }
})

const User = module.exports = mongoose.model('User', SCHEMA);