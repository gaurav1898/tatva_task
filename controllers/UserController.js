const mongoose = require('mongoose');
const UserSchema = require('../models/user');
const UserService = require('../services/UserService');
const roleList = require('../seed/Roles')
const Token = require('../handler/genToken');

exports.Add = (req, res, next) => {
    function generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    let password = generateRandomString(7);
    // let userId;

    // if (req.tokenData.data._id) {
    //     userId = req.tokenData.data._id;
    // }
    let formData = new UserSchema({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
        dob: req.body.dob,
        role: req.body.role
    })

    UserService.Add(formData, (err, user) => {
        if (err) {
            let message = [];
            console.log("Test", err);
            if (err.errors.firstName)
                message.push("First Name is required");
            if (err.errors.lastName)
                message.push("Last Name is required");
            if (err.errors.email)
                message.push("email is required");
            if (err.errors.dob)
                message.push("dob is required");

            return res.json({
                success: false,
                err_subject: "Error !!",
                err_message: err
            })
        }
        else {
            return res.json({
                success: true,
                success_subject: "Success !!",
                success_message: "You have successfully registered the user",
                user: user
            })
        }

    })
}

exports.SignIn = (req, res, next) => {
    console.log("Processing Login");
    console.log(req.body);

    console.log(req.body.email)
    UserService.findUserByRole(req.body.email, roleList.Roles, (err, user) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                success: false,
                err_subject: "Authentication Error",
                err_message: err
            })
        }
        if (!user) {
            console.log("Invalid email, username, password");
            res.status(400).json({
                success: false,
                err_subject: "Authentication Error",
                err_message: "Invalid Authentication, Please check your login name and password"
            });
        }
        if (req.body !== null) {
            UserService.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    console.log("Invalid Password")
                    res.status(400).json({
                        success: false,
                        err_subject: "Authentication Error",
                        err_message: "Invalid Authentication, Please check your login name and password"
                    });
                }
                if (isMatch) {
                    console.log("user found")
                    if (user) {
                        const token = Token.generateToken(user);
                        return res.json({
                            success: true,
                            role: user.roles,
                            token: "JWT " + token
                        })
                    } else {
                        return res.status(400).json({
                            success: false,
                            err_subject: "Oops",
                            err_message: "Something went wrong. Please contact technical support"
                        })
                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        err_subject: "Authentication Error",
                        err_message: "Wrong Password"
                    })
                }
            })

        }

    })
}