const Top5List = require('../models/post-model');
const UserTop5List = require('../models/user-top5list-model');
const CommunityTop5List = require('../models/community-top5list-model')
const Post = require('../models/post-model');

/** Controller for publishing top5lists
 * 
 *  req.params: { id: id of the list to publish }
 * 
 *  req.body: { postId: id of the post associated with the list }
 */
publishTop5List = async (req, res) => {
    if (!req.body || !req.body.postId) {
        return res.status(400).json({success: false, message: "Body and PostId required"});
    }
    UserTop5List.findById(req.params.id, (err, list) => {
        if (err || !list) {
            return res.status(404).json({success: false, error: "Top5List not found!"});
        }
        list.published = Date.now();
        list.postId = req.body.postId;
        list.save().then(() => {
            return res.status(200).json({success: true, message: "Top5List published!", top5list: list});
        }).catch((err) => {
            return res.status(500).json({success: false, error: err.message});
        })
    });
}

/**
 * Controller method for handling the creation of a new UserTop5List
 * 
 * req.body: {
 *      name: name of the list, 
 *      author: auther of the list,
 *      userId: the authers id,
 *      items: [] of the top5 items
 * }
 */
createUserTop5List = async (req, res) => {
    
    // Next, create the top5 list with the associated post
    let userTop5List = new UserTop5List({
        userId: req.body.userId,
        author: req.body.author,
        items: req.body.items,
        name: req.body.name,
        postId: null, 
        published: ""
    });
    userTop5List.save().then(() => {
        return res.status(200).json({success: true, message: "Top5List Created!", top5list: userTop5List});
    }).catch((err) => { 
        return res.status(404).json({success: false, error: err.message});
    });
}

/**
 * Controller method for handling updates to a UserTop5List
 * 
 * req.params: { id: the id of the list to update }
 * 
 * req.body: {
 *      name: the lists name,
 *      items: array of lists items,
 * }
 */
updateUserTop5List = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ success: false, message: "Body required for update."});
    } 

    let list = await UserTop5List.findById(req.params.id).catch((err) => { 
        console.log(err);
    })

    if (!list) {
        return res.status(400).json({ success: false, message: "List not found"});
    }

    list.name = req.body.name;
    list.items = req.body.items;
    list.save().then(() => {
        return res.status(200).json({ 
            success: true,
            message: "Top5List updated!",
            top5list: list
        });
    }).catch((err) => { 
        console.log(err);
    })
}

// Gets the current users top5lists
// TODO should be for current users lists -> req.userId
getUserTop5Lists = async (req, res) => {
    console.log("Getting users lists");
    console.log(req.user);
    UserTop5List.find({userId: req.userId}, (err, lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        // if (!lists.length) {
        //     return res.status(404).json({ success: false, error: "Top5Lists not found!"});
        // }

        return res.status(200).json({ success: true, message: "Top5Lists found!", top5lists: lists});
    }).catch((err) => { console.log(err); });
}

// Gets all the top5lists
// Should it only return published lists? I guess it's fine for now...
getTop5Lists = async (req, res) => {
    UserTop5List.find({published: {$not : {$eq : null}}}, (err, lists) => {
        if (err) {
            return res.status(500).json({success: false, error: err.message});
        } 
        
        return res.status(200).json({success: true, message: "Top5Lists found!", top5lists: lists});
    }).catch((err) => { return res.status(500).json({success: false, error: err.message}); });
}

/**
 * Deletes a users top5list by id
 * 
 * req.params: {id: the id of the list to delete}
 */
deleteUserTop5List = async (req, res) => {
    UserTop5List.findById(req.params.id, async (err, list) => {
        if (!list || err) {
            return res.status(404).json({ success: false, error: "Top5List not found!" });
        }
        UserTop5List.findOneAndDelete({_id: list.id}).catch((err) => { 
            return res.status(500).json({ success: false, error: err}); 
        });
        return res.status(200).json({ success: true, message: "Top5List Deleted!"})
    });
}

module.exports = {
    createUserTop5List,
    updateUserTop5List,
    getTop5Lists,
    getUserTop5Lists,
    publishTop5List,
    deleteUserTop5List
}