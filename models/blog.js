const mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishedDate: {
        type: DateOnly,
    },
    modifyDate: {
        type: DateOnly,
    },
    status: {
        type: String,
        enum: ["publish", "unpublish"],
        default: "publish"
    },
    category: {
        type: String,
        required: true
    },
    startDate: {
        type: DateOnly,
    },
    endDate: {
        type: DateOnly,
    },
    recurrence: [{
        startDate: DateOnly,
        endDate: DateOnly
    }]

})

const Blog = module.exports = mongoose.model('Blog', SCHEMA);