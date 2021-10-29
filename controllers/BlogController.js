const mongoose = require('mongoose');
const BlogSchema = require('../models/blog');
const BlogService = require('../services/BlogService');
const roleList = require('../seed/Roles')
const Token = require('../handler/genToken');

exports.Add = (req, res, next) => {
    let formData = new BlogSchema({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        publishedDate: req.body.publishedDate,
        modifyDate: req.body.modifyDate,
        status: req.body.status,
        category: req.body.category,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        recurrence: {
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }
    })

    BlogService.Add(formData, (err, blog) => {
        if (err) {
            let message = [];
            if (err.errors.title)
                message.push("Title is required");
            if (err.errors.description)
                message.push("description is required");
            if (err.errors.publishedDate)
                message.push("publishedDate is required");

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
                success_message: "You have successfully added the blog",
                blog: blog
            })
        }

    })
}

exports.GetAll = (req, res, next) => {
    BlogService.GetAll((err, blog) => {
        if (err) {
            console.log(err)
        }
        return res.json({
            success: true,
            blog
        })
    })

}


exports.Update = (req, res, next) => {
    const id = req.params.id;
    BlogService.GetByID(id, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                err_subject: 'Error',
                err_message: "No Blog found, If you found any issue please contact to technical team."
            })
        } else {
            AssignService.Update(id, req.body.requestId, (err, data) => {
                if (err) {
                    let message = [];
                    console.log(err);
                    return res.json({
                        success: false,
                        err_subject: "Error !!",
                        err_message: message
                    })
                } else {
                    return res.json({
                        success: true,
                        success_subject: "Success !!",
                        success_message: "blog Updated Successfully.."
                    })
                }
            })

        }
    })
}

exports.DeActivateUser = (req, res, next) => {
    console.log(req.params._id)
    BlogService.deactivateBlog(req.params._id, (err, success) => {
        if (err) {
            res.json({
                success: false,
                err_subject: 'Error!!',
                err_message: 'Oops Something went wrong, Please contact your admin'
            })
        }
        if (success) {
            res.json({
                success: true,
                success_subject: 'Success!!',
                success_message: 'Blog Deleted Successfully'
            })
        }
    })
}