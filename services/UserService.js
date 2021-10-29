const bcrypt = require('bcryptjs');
const User = require('../models/user');
var config = require('config');

module.exports.Add = function (newUser, callback) {
    bcrypt.genSalt(config.get('App.SALT_ROUNDS'), (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.findUserByRole = function (email, role, callback) {
    const queryByEmail = {
        email: email,
        "roles": { $in: role }
    }
    User.findOne(queryByEmail, callback)
}

module.exports.comparePassword = function (password, hashPassword, callback) {
    bcrypt.compare(password, hashPassword, (err, isMatch) => {
        console.log("hashpassword :" + hashPassword)
        if (err) throw err;
        callback(null, isMatch);
    });
}