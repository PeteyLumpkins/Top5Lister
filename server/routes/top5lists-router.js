const auth = require('../auth')
const express = require('express')

const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const PostController = require('../controllers/post-controller')
const CommunityTop5ListController = require('../controllers/community-top5list-controller')

const router = express.Router()

// Top5List routes
router.put('/usertop5list/:id', auth.verify, Top5ListController.updateUserTop5List);
router.post('/usertop5list', auth.verify, Top5ListController.createUserTop5List);
router.put('/publish/:id', auth.verify, Top5ListController.publishTop5List);
router.delete('/usertop5list/:id', auth.verify, Top5ListController.deleteUserTop5List);
router.get('/top5lists', Top5ListController.getTop5Lists);
router.get('/usertop5lists/', auth.verify, Top5ListController.getUserTop5Lists);

// CommunityTop5List routes
router.post('/communitytop5list', CommunityTop5ListController.createCommunityTop5List);
router.get('/communitytop5lists', CommunityTop5ListController.getAllCommunityTop5Lists);
router.get('/communitytop5list/:community', CommunityTop5ListController.getCommunityTop5List);
router.put('/communitytop5lists/addto/:community', CommunityTop5ListController.addToCommunityTop5List);
router.put('/communitytop5lists/removefrom/:community', CommunityTop5ListController.removeFromCommunityTop5List);
router.delete('/communitytop5list/:community', CommunityTop5ListController.deleteCommunityTop5List);

// Post routes 
router.post('/post', PostController.createPost);
router.get('/posts', PostController.getAllPosts);
router.get('/post/:id', PostController.getPostById);
router.put('/post/:id', PostController.updatePost);
router.delete('/post/:id', PostController.deletePost);

// User routes
router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
module.exports = router