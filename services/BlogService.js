const Blog = require('../models/blog');
var config = require('config');

module.exports.Add = function (newBlog, callback) {
    newBlog.save(callback);
}

module.exports.GetAll = function (callback) {
    Blog.find(callback);
}

module.exports.Update = function (id, updateData, callback) {
    let query = {
        _id: id,
    }
    Blog.updateOne(query, { $set: updateData }, callback);
}

module.exports.GetByID = function (id, callback) {
    Blog.findById(id, callback)
}
module.exports.deactivateBlog = function (UserId, callback) {
    let query = {
        _id: UserId
    }
    Blog.remove(query, callback);
}