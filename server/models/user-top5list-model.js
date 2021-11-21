const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserTop5ListSchema = new Schema(
    { 
        name: {type: String, required: true},
        author: {type: String, required: true},
        userId: {type: String, required: true},
        items: {type: [String], required: true},
        published: {type: Date},
        postId: {type: String}
    }, 
    { timestamps: true },
)

module.exports = mongoose.model('UserTop5List', UserTop5ListSchema);