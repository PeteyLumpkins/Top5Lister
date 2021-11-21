const Post = require('../models/post-model');

/**
 * Handles creating a new Post object in the database
 * 
 * req.body: { 
 *      likes: [] of users who have liked the post
 *      dislikes: [] of users who have disliked the post
 *      views: number of views of the post
 *      comments: [] comments 
 * }
 */
 createPost = async (req, res) => {
    let post = new Post({
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        comments: req.body.comments,
        views: req.body.views
    });

    post.save().then(() => {
        return res.status(200).json({success: true, message: "Post Created!", post: post});
    }).catch((err) => { 
        return res.status(404).json({success: false, error: "Post creation failed."});
    });
    
}

/**
 * Controller method for updating a post
 * 
 * req.params: { id: postId }
 * 
 * req.body: {
 *      likes: [] of users who have liked the post
 *      dislikes: [] of users who have disliked the post
 *      views: count of number of views
 *      comments: [] of comments 
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

/**
 * Controller method for deleting a post 
 * 
 * req.params: { id: the id of the post }
 */
deletePost = async (req, res) => {
    Post.findById(req.params.id).then(() => {
        Post.findOneAndDelete({id: req.params.id}).then(() => {
            return res.status(200).json({success: true, message: "Post Deleted!"});
        }).catch((err) => {
            return res.status(500).json({success: false, message: "Post failed to delete."})
        });
    }).catch((err) => { 
        return res.status(404).json({success: false, message: "Post failed to delete"})
    })
}

/**
 * Controller method for getting a post by id
 * 
 * req.params: {id: th id of th post }
 */
getPostById = async (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            return res.status(404).json({success: false, error: err});
        }
        return res.status(200).json({success: true, message: "Post found!", post: post});
    })
}

/**
 * Controller method for getting all posts
 */
getAllPosts = async (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            return res.status(404).json({success: false, error: err});
        }
        return res.status(200).json({success: true, message: "Got posts!", posts: posts});
    })
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostById
}