const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityTop5ListSchema = new Schema(
    { 
        postId: {type: String, required: true},
        community: {type: String, required: true, uppercase: true},
        lastUpdated: {type: Date, required: true},
        itemCounts: {type: Object, required: true},
    }, 
    { timestamps: true },
)

module.exports = mongoose.model('CommunityTop5List', CommunityTop5ListSchema);