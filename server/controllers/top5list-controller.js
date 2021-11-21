const Top5List = require('../models/post-model');
const UserTop5List = require('../models/user-top5list-model');
const CommunityTop5List = require('../models/community-top5list-model')
const Post = require('../models/post-model');

/** Controller for publishing top5lists
 * 
 *  req.body = { id: lists id number}
 */
publishTop5List = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({success: false, error: "Requires a body."});
    }

    let list = await UserTop5List.findById(req.body.id).catch((err) => { console.log(err) });
        
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
 * req.body: {
 *      id: the lists id number,
 *      name: the lists name,
 *      items: array of lists items,
 * }
 */
updateUserTop5List = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ success: false, message: "Body required for update."});
    } 

    let list = await UserTop5List.findById(req.body.id).catch((err) => { 
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
 * req.body: {
 *      id: the id of the post
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
    let post = await Post.findById(req.body.id).catch((err) => { 
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
    await UserTop5List.find({userId: req.userId}, (err, lists) => {
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

updateTop5List = async (req, res) => {
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        top5List.name = body.name
        top5List.items = body.items
        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

deleteTop5List = async (req, res) => {
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}

getTop5ListById = async (req, res) => {
    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (list.ownerId !== req.userId) {
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }
        
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}

getTop5List = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}

getTop5ListPairs = async (req, res) => {
    await Top5List.find({ownerEmail: req.params.email }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let pair = {
                    _id: list._id,
                    name: list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
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
deleteCommunityTop5List = async (name, items) => {

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
    let communityList = await CommunityTop5List.findOne({"community": name.toUpperCase()});

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

}


module.exports = {
    createUserTop5List,
    updateUserTop5List,
    getTop5Lists,
    getUserTop5Lists,
    getCommunityTop5Lists,
    updatePost,
    publishTop5List,

    // updateTop5List,
    // deleteTop5List,
    // getTop5Lists,
    // getTop5ListPairs,
    // getTop5ListById
}