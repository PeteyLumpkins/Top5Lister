const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserTop5ListSchema = new Schema(
    { 
        top5ListId: {type: String, required: true},
        published: {type: Date},
        author: {type: String, required: true},
        items: {type: [String], required: true},

    }, 
    { timestamps: true },
)

module.exports = mongoose.model('UserTop5List', UserTop5ListSchema);