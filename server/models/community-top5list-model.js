const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityTop5ListSchema = new Schema(
    { 
        top5ListId: {type: String, required: true},
        community: {type: String, required: true, uppercase: true},
        lastUpdated: {type: Date},
        itemCounts: {type: Map, of: Number, required: true},
    }, 
    { timestamps: true },
)

module.exports = mongoose.model('CommunityTop5List', CommunityTop5ListSchema);