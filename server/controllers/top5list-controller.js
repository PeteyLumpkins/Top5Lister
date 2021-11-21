const Top5List = require('../models/post-model');
const UserTop5List = require('../models/user-top5list-model');
const CommunityTop5List = require('../models/community-top5list-model')
const Post = require('../models/post-model');

/** Controller for publishing top5lists
 * 
 *  req.params: { id: id of the list to publish }
 */
publishTop5List = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({success: false, error: "Requires a body."});
    }

    let list = await UserTop5List.findById(req.params.id).catch((err) => { console.log(err) });
        
    if (!list) {
        return res.status(404).json({success: false, error: "List not found!"});
    }

    list.published = Date.now();
    list.save().catch((err) => { console.log(err) })

    await updateCommunityTop5List(list.name, list.items).catch((err) => { 
        return res.status(404).json({success: false, error: err});
    })
            
    return res.status(200).json({success: true, message: "Top5List Published!", list: list});
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
    // First creat the post associated with the new top5 list
    let post = await createNewPost();
    
    // Next, create the top5 list with the associated post
    let userTop5List = new UserTop5List({
        postId: post._id, 
        userId: req.body.userId,
        published: null,
        author: req.body.author,
        items: req.body.items,
        name: req.body.name
    });
    let savedList = await userTop5List.save()
                                      .catch((err) => { 
                                          return res.status(400).json({success: false, error: "Error occured while saving user top5list"})
                                        });
    if (!savedList) {
        return res.status(500).json({success: false, error: "Unknown error occured on the server"})
    }

    return res.status(200).json(savedList);
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

/**
 * Controller method for handling updates to the post associated with a UserTop5List
 * 
 * req.params: { id: postId }
 * 
 * req.body: {
 *      likes: list of users who have liked the post
 *      dislikes: list of users who have disliked the post
 *      views: count of number of views
 *      comments: list of comments 
 * }
 */
updatePost = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ success: false, message: "Body required for update."});
    } 
    let post = await Post.findById(req.params.id).catch((err) => { 
        console.log(err);
    });
    if (!post) {
        return res.status(404).json({ success: false, message: "Post failed to update."});
    }

    post.likes = req.body.likes;
    post.dislikes = req.body.dislikes;
    post.views = req.body.views;
    post.comments = req.body.comments;
    post.save().then(() => {
        return res.status(200).json({
            success: true,
            message: "Post Updated!",
            post: post
        });
    }).catch((err) => { console.log(err)});
}

// Gets the current users top5lists
getUserTop5Lists = async (req, res) => {
    await UserTop5List.find({userId: req.params.id}, (err, lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!lists.length) {
            return res.status(404).json({ success: false, error: "Top5Lists not found!"});
        }

        return res.status(200).json({ success: true, lists: lists});
    }).catch((err) => { console.log(err); });
}

// Gets all the top5lists
getTop5Lists = async (req, res) => {

    await UserTop5List.find({published: {$not : {$eq : null}}}, (err, lists) => {
        if (err) {
            return res.status(404).json({success: false, error: err});
        }
        return res.status(200).json({success: true, message: "Successfully got Top5Lists", top5lists: lists});
    }).catch((err) => { console.log(err) });

}

// Gets all of the community top5lists
getCommunityTop5Lists = async (req, res) => {
    await CommunityTop5List.find({}, (err, lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!lists.length) {
            return res.status(404).json({ success: false, error: "Top5Lists not found!"});
        }

        return res.status(200).json({ success: true, lists: lists});
    }).catch((err) => { console.log(err); });
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

        Post.findOneAndDelete(list.postId).catch((err) => { 
            return res.status(500).json({ success: false, error: err});
        });
        UserTop5List.findOneAndDelete(list.id).catch((err) => { 
            return res.status(500).json({ success: false, error: err}); 
        });

        unUpdateCommunityTop5List(list.name, list.items);

        return res.status(200).json({ success: true, message: "Top5List Deleted!"})
    });
}

// THE REST OF THE METHODS HERE ARE NOT ACTUAL CONTROLLER METHODS. THEY
// ARE MORE OR LESS JUST HELPER METHODS

/**
 * Handles creating a new Post object in the database
 */
createNewPost = async () => {
    let post = new Post({
        likes: [],
        dislikes: [],
        comments: [],
        views: 0
    });
    let savedPost = await post.save().catch((err) => { return {success: false, error: err}; });
    if (!savedPost) {
        return {success: false}
    }
    return {
        success: true,
        _id: savedPost._id,
        likes: savedPost.likes,
        dislikes: savedPost.dislikes,
        comments: savedPost.comments,
        views: savedPost.views
    };
}

/**
 * Handles deleting a Top5CommunityList object 
 */
deleteCommunityTop5List = async (name) => {
    let list = await CommunityTop5List.findById({community: name.toUpperCase()}).catch((err) => {
        return res.status(404).json({ success: false, error: "CommunityTop5List not found."})
    });

    if (!list) {
        return res.status(404).json({ success: false, error: "CommunityTop5List not found."});
    }
    await Post.findOneAndDelete({id: list.postId}).catch((err) => { 
        return res.status(404).json({ success: false, error: "CommunityTop5List post didn't delete."});
    })
    await CommunityTop5List.findOneAndDelete({id: list.id}).catch((err) => { 
        return res.status(404).json({ success: false, error: "CommunityTop5List didn't delete."});
    })

    return res.status(200).json({ success: true, message: "CommunityTop5List deleted successfully"});
}

/**
 * Handles creating a new Top5CommunityList object in the database
 */
createCommunityTop5List = async (name, items) => {
    let post = await createNewPost().catch((err) => { return res.status(400).json({error: err})});
    // return res.status(200).json({messagee: "Hello world"});

    let itemCounts = {}
    for (let i = 0; i < items.length; i++) {
        itemCounts[items[i]] = 5 - i
    }

    let commTop5List = new CommunityTop5List({
        postId: post._id, 
        community: name,
        lastUpdated: Date.now(),
        itemCounts: itemCounts
    });

    let savedList = await commTop5List.save().catch((err) => { return {success: false, error: err}});
    if (!savedList) {
        return {success: false, error: "Top5CommunityList didnt't save to the database..."}
    }

    return {
        success: true,
        message: "Community Top5List was successfully created!",
        communityList: savedList
    };
}

/**
 * Handles updating a Top5CommunityList. 
 * 
 * Case 1: A community list with the given name EXISTS. In this case, we add the items
 *         and their respective values to the community list with the given names
 * 
 * Case 2: A community list with the given name DOES NOT EXIST. In this case, the function
 *         creates and new Top5CommunityList with the given name and items
 */
updateCommunityTop5List = async (name, items) => {
    let communityList = await CommunityTop5List.findOne({community: name.toUpperCase()});

    if (!communityList) {
        let newCommunityList = await createCommunityTop5List(name, items);
        return {
            success: true,
            msg: "Community List Created!", 
            list: newCommunityList
        };
    } else {
        
        let itemCounts = {...communityList.itemCounts};

        for (let i = 0; i < items.length; i++) {
            if (items[i] in communityList.itemCounts) {
                itemCounts[items[i]] += 5 - i
            } else {
                itemCounts[items[i]] = 5 - i
            }
        }

        communityList.itemCounts = itemCounts;
        let savedList = await communityList.save().catch((err) => { return {success: false, error: err} });

        return {
            success: true,
            msg: "Community List Updated!", 
            list: savedList
        };
    }
}

/**
 * Handles deleting and removing items from a Top5CommunityList.
 * 
 * A community list with the given name EXISTS. In this case, the function
 * SUBTRACTS the items respective values from the community list with the given name.
 * 
 * If the the items count hits zero, the item is removed from the community list item counts
 */
unUpdateCommunityTop5List = async (name, items) => {
    let list = await CommunityTop5List.findOne({community: name.toUpperCase()}).catch((err) => { console.log(err); });

    if (!list) {
        return {success: false, error: "No communityTop5List found"}
    }

    let itemCounts = {...list.itemCounts};

    for (let i = 0; i < items.length;  i++) {
        if (items[i] in itemCounts) {
            itemCounts[items[i]] -= 5 - i
            if (itemCounts[items[i]] <= 0) {
                delete itemCounts[items[i]];
            }
        }  
    }

    if (Object.keys(itemCounts).length === 0) {
        deleteCommunityTop5List(name).then(() => {
            return {success: true, message: "Community List Updated and Deleted!"}
        }).catch((err) => { console.log(err) })
    }

    list.itemCounts = itemCounts;
    list.save().then(() => {
        return {success: true, message: "Community List Updated!", list: list}
    }).catch((err) => {console.log(err);});
}


module.exports = {
    createUserTop5List,
    updateUserTop5List,
    getTop5Lists,
    getUserTop5Lists,
    getCommunityTop5Lists,
    updatePost,
    publishTop5List,
    deleteUserTop5List
}