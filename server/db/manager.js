const Top5List = require('../models/top5list-model');
const UserTop5List = require('../models/user-top5list-model');
const CommunityTop5List = require('../models/community-top5list-model');

function DBManager() {

    const db = {};

    // Gets user lists by 
    db.getCommunityTop5Lists = async (name) => {
        let lists = CommunityTop5List.find({"community": new RegExp("^" + name, "i")});

        if (!lists) {
            return {success: false, message: "No Community Lists Found starting with " + name}
        }
        return lists;
    }

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
        return {
            success: true, 
            message: "List created", 
            top5list: this.assembleCommunityList(top5list, savedList)
        };
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

        return {success: true, message: "User list created!", top5list: this.assembleUserTop5List(top5list, savedList)};
    }

    db.updateUserTop5List = async (listBody) => {

    }

    createTop5List = async (listBody) => {
        const newlist = new Top5List(listBody)
        const savedList = await newlist.save();

        return savedList;   
    }

    assembleUserList = (top5List, userTop5List) => {
        return ({
            id: userTop5List.id,
            name: top5List.name,
            comments: top5List.comments,
            likes: top5List.likes,
            dislikes: top5List.dislikes,
            views: top5List.views,
            published: userTop5List.published,
            author: userTop5List.author,
            items: userTop5List.items,
        });
    }

    assembleCommunityList = (top5List, communityTop5List) => {

        let array = [];
        let keys = Object.keys(communityTop5List.itemCounts)
        for (let i = 0; i < keys.length; i++) {
            array.push({ name: keys[i], count: communityTop5List.itemCounts[keys[i]] });
        }

        array.sort(function(a, b) {
            return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0)
        });

        let items = array.slice(0, 5);

        return ({
            id: communityTop5List.id,
            name: top5List.name,
            comments: top5List.comments,
            likes: top5List.likes,
            dislikes: top5List.dislikes,
            views: top5List.views,
            lastUpdated: communityTop5List.lastUpdated,
            items: items,
        });
    }

    return db;
}

const dbmanager = DBManager();
module.exports = dbmanager;






