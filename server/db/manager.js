const Top5List = require('../models/top5list-model');
const UserTop5List = require('../models/user-top5list-model');
const CommunityTop5List = require('../models/community-top5list-model');

function DBManager() {

    const db = {};

    // Creates a new community-list
    db.createCommunityTop5List = async (listBody) => {

        if (await CommunityTop5List.findOne({"community": listBody.community.toUpperCase()})) {
            return {success: false, message: "Community list already exists!"};
        }
        
        let top5list = await this.createTop5List(listBody.top5List);
        if (!top5list) {
            return null;
        }

        let commTop5List = new CommunityTop5List({
            top5ListId: top5list._id, 
            community: listBody.community,
            lastUpdated: listBody.lastUpdated,
            itemCounts: listBody.itemCounts
        });

        if (!commTop5List) {
            return {success: false, message: "Error occured"};
        }

        let savedList = await commTop5List.save();
        return {success: true, message: "List created", top5list: savedList};
    }

    // Creates a new user-list
    db.createUserTop5List = async (listBody) => {
        let top5list = await this.createTop5List(listBody.top5List);
        if (!top5list) {
            return {success: false, message: "Error occured while creating list"};
        }

        let userTop5List = new UserTop5List({
            top5ListId: top5list._id, 
            published: listBody.published,
            author: listBody.author,
            items: listBody.items
        });

        if (!userTop5List) {
            return {success: false, message: "Error occured while creating list"};
        }

        let savedList = await userTop5List.save();
        return {success: true, message: "User list created!", top5list: savedList};
    }

    db.updateUserTop5List = async (listBody) => {

    }

    createTop5List = async (listBody) => {
        const newlist = new Top5List(listBody)
        const savedList = await newlist.save();

        return savedList;   
    }

    return db;
}

const dbmanager = DBManager();
module.exports = dbmanager;






