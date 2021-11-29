const CommunityTop5List = require('../models/community-top5list-model');

/**
 * Handles creating a CommunityTop5List
 * 
 * req.body: {
 *      community: community name,
 *      postId: id of the post
 *      items: the initial items to add
 * }
 */
createCommunityTop5List = async (req, res) => {

    if (!req.body || !req.body.community || !req.body.items) {
        return res.status(400).json({ success: false, error: "Requires a body with community and items."})
    }

    let itemCounts = {}
    for (let i = 0; i < req.body.items.length; i++) {
        itemCounts[req.body.items[i]] = 5 - i
    }

    let commTop5List = new CommunityTop5List({
        postId: req.body.postId,
        community: req.body.community,
        lastUpdated: Date.now(),
        itemCounts: itemCounts
    });

    commTop5List.save().then(() => {
        return res.status(200).json({success: true, message: "CommunityTop5List created!", list: commTop5List});
    }).catch((err) => { 
        return res.status(404).json({success: false, error: "CommunityTop5List creation failed."});
    });
}

/**
 * Gets all community top5lists
 */
getAllCommunityTop5Lists = async (req, res) => {
    await CommunityTop5List.find({}, (err, lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        // if (!lists.length) {
        //     return res.status(404).json({ success: false, error: "Top5Lists not found!"});
        // }

        return res.status(200).json({ success: true, message: "Top5lists found", top5lists: lists});
    }).catch((err) => { console.log(err); });
}

/**
 * Gets a communtiy top5list by name
 */
getCommunityTop5List = async (req, res) => {
    if (!req.params || !req.params.community) {
        return res.status(400).json({success: false, error: "Bad Request. Param 'name' required."});
    }
    await CommunityTop5List.findOne({community: req.params.community}, (err, list) => {
        if (err) {
            return res.status(404).json({ success: false, error: err });
        }
        // if (!list) {
        //     return res.status(404).json({ success: true, message: "Community List Not Found!", list: null});
        // }
        return res.status(200).json({success: true, message: "Community List Found!", list: list}) 
    })
}

/**
 * Adds items and respective scores to an existing community top5list
 * 
 * req.params: { community: community lists name}
 * 
 * req.body: { items: [] of items to add }
 */
addToCommunityTop5List = async (req, res) => {
    CommunityTop5List.findOne({community: req.params.community.toUpperCase()}, (err, list) => {
        if (err) {
            return res.status(404).json({ success: false, error: err });
        } else if (!list) {
            return res.status(400).json({ success: false, error: "Community Top5List doesn't exist"})
        }

        let itemCounts = {...list.itemCounts};
        for (let i = 0; i < req.body.items.length; i++) {
            if (req.body.items[i] in list.itemCounts) {
                itemCounts[req.body.items[i]] += 5 - i
            } else {
                itemCounts[req.body.items[i]] = 5 - i
            }
        }
        list.itemCounts = itemCounts;
        list.save().then(() => {
            return res.status(200).json({success: true, message: "Community Top5List Updated!", list: list})
        }).catch((err) => { 
            return res.status(500).json({success: false, error: err});
        })
    });
}

/**
 * Removes items and respective scores from an existing community top5list
 * 
 * req.params: { community: community lists name}
 * 
 * req.body: { items: [] of items to remove }
 */
removeFromCommunityTop5List = async (req, res) => {
    CommunityTop5List.findOne({community: req.params.community}, (err, list) => {

        if (err) {
            return res.status(404).json({ success: false, error: err });
        } else if (!list) {
            return res.status(400).json({ success: false, error: "Community Top5List doesn't exist"})
        }

        let itemCounts = {...list.itemCounts};

        for (let i = 0; i < req.body.items.length;  i++) {
            if (req.body.items[i] in itemCounts) {
                itemCounts[req.body.items[i]] -= 5 - i
                if (itemCounts[req.body.items[i]] <= 0) {
                    delete itemCounts[req.body.items[i]];
                }
            }  
        }
        list.itemCounts = itemCounts;

        list.save().then(() => {
            return res.status(200).json({success: true, message: "Community Top5List Updated!", list: list});
        }).catch((err) => {
            return res.status(500).json({success: false, error: err});
        });

    });
}

/**
 * Handles deleting a Top5CommunityList object 
 * 
 * req.params: { community: community lists name }
 */
 deleteCommunityTop5List = async (req, res) => {
    CommunityTop5List.findOne({community: req.params.community.toUpperCase()}, (err, list) => {
        if (err || !list) {
            return res.status(404).json({ success: false, error: "CommunityTop5List not found."});
        }

        CommunityTop5List.findOneAndDelete({community: req.params.community.toUpperCase()}, (err, list) => {
            if (err || !list) {
                return res.status(500).json({ success: false, error: "CommunityTop5List failed to delete."})
            }
            return res.status(200).json({ success: true, error: "CommunityTop5List successfully deleted!"});
        });
    });
}

module.exports = {
    createCommunityTop5List,
    getAllCommunityTop5Lists,
    getCommunityTop5List,
    addToCommunityTop5List,
    removeFromCommunityTop5List,
    deleteCommunityTop5List
}

