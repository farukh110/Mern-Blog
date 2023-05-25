const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({

    content: {
        type: String,
        required: true,
    },
    blog: {
        type: mongoose.SchemaTypes.ObjectId,
        // ref: 'blogs'
        ref: 'Blog'
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        // ref: 'users'
        ref: 'User'
    }

}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema, 'comments');