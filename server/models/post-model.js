const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema(
    {
        comments: { type: [Object], required: true },
        likes: {type: [String], required: true },
        dislikes: {type: [String], required: true},
        views: {type: Number, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Post', Post)
